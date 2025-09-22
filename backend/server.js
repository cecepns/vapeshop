const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads-vapeshop-samarinda', express.static('uploads-vapeshop-samarinda'));

// Database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads-vapeshop-samarinda/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Products Routes
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    const params = [];

    if (search) {
      query += ' WHERE name LIKE ? OR description LIKE ?';
      countQuery += ' WHERE name LIKE ? OR description LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [products] = await db.execute(query, params);
    const [countResult] = await db.execute(countQuery, search ? [`%${search}%`, `%${search}%`] : []);
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      data: products,
      currentPage: page,
      totalPages,
      total,
      hasMore: page < totalPages
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/products', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file ? `uploads-vapeshop-samarinda/${req.file.filename}` : null;

    if (!name || !description || !price || !stock || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)',
      [name, description, parseFloat(price), parseInt(stock), image]
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Product created successfully' 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/products/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const productId = req.params.id;

    // Get existing product
    const [existingProducts] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
    
    if (existingProducts.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingProduct = existingProducts[0];
    let image = existingProduct.image;

    // If new image is uploaded
    if (req.file) {
      // Delete old image
      if (existingProduct.image && fs.existsSync(existingProduct.image)) {
        fs.unlinkSync(existingProduct.image);
      }
      image = `uploads-vapeshop-samarinda/${req.file.filename}`;
    }

    await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?',
      [name, description, parseFloat(price), parseInt(stock), image, productId]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // Get product to delete image file
    const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];

    // Delete image file
    if (product.image && fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    // Delete from database
    await db.execute('DELETE FROM products WHERE id = ?', [productId]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Settings Routes
app.get('/api/settings', async (req, res) => {
  try {
    const [settings] = await db.execute('SELECT * FROM settings LIMIT 1');
    
    if (settings.length === 0) {
      // Return default settings
      const defaultSettings = {
        shop_name: 'Vape Shop',
        address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
        phone: '+62 857-5234-8507',
        email: 'info@vapeshop.com',
        about: 'Vape Shop Samarinda adalah toko vape terpercaya yang menyediakan produk-produk berkualitas tinggi untuk para penggemar vaping di Kalimantan Timur.',
        maps_embed: '',
        instagram: '',
        facebook: '',
        whatsapp: '+62 857-5234-8507'
      };
      return res.json(defaultSettings);
    }

    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const {
      shop_name,
      address,
      phone,
      email,
      about,
      maps_embed,
      instagram,
      facebook,
      whatsapp
    } = req.body;

    // Check if settings exist
    const [existingSettings] = await db.execute('SELECT id FROM settings LIMIT 1');

    if (existingSettings.length === 0) {
      // Insert new settings
      await db.execute(
        'INSERT INTO settings (shop_name, address, phone, email, about, maps_embed, instagram, facebook, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [shop_name, address, phone, email, about, maps_embed, instagram, facebook, whatsapp]
      );
    } else {
      // Update existing settings
      await db.execute(
        'UPDATE settings SET shop_name = ?, address = ?, phone = ?, email = ?, about = ?, maps_embed = ?, instagram = ?, facebook = ?, whatsapp = ? WHERE id = ?',
        [shop_name, address, phone, email, about, maps_embed, instagram, facebook, whatsapp, existingSettings[0].id]
      );
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await db.execute(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ error: 'Only image files are allowed' });
  }

  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);