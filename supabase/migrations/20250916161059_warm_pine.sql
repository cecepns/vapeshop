-- Create database
CREATE DATABASE IF NOT EXISTS vape_shop_db;
USE vape_shop_db;

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shop_name VARCHAR(255) DEFAULT 'Vape Shop',
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  about TEXT,
  maps_embed TEXT,
  instagram VARCHAR(255),
  facebook VARCHAR(255),
  whatsapp VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (shop_name, address, phone, email, about, whatsapp) VALUES (
  'Vape Shop',
  'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
  '+62 857-5234-8507',
  'info@vapeshop.com',
  'Vape Shop Samarinda adalah toko vape terpercaya yang menyediakan produk-produk berkualitas tinggi untuk para penggemar vaping di Kalimantan Timur.',
  '+62 857-5234-8507'
);

-- Insert sample products
INSERT INTO products (name, description, price, stock, image) VALUES
('RELX Infinity Pod', '<p>Pod system terbaru dari RELX dengan teknologi Super Smooth dan kapasitas baterai 380mAh.</p><ul><li>Kapasitas: 1.9ml</li><li>Baterai: 380mAh</li><li>Charging: USB-C</li></ul>', 299000, 25, 'uploads-vapeshop-samarinda/sample1.jpg'),
('JUUL Starter Kit', '<p>Starter kit lengkap JUUL dengan 2 pods dan charger USB magnetic.</p><ul><li>Baterai: 200mAh</li><li>Pod capacity: 0.7ml</li><li>Nicotine: 3% dan 5%</li></ul>', 450000, 15, 'uploads-vapeshop-samarinda/sample2.jpg'),
('VAPORESSO XROS Mini', '<p>Pod mod kecil namun powerful dengan coil mesh untuk flavor terbaik.</p><ul><li>Kapasitas: 2ml</li><li>Baterai: 1000mAh</li><li>Output: 5-16W</li></ul>', 325000, 30, 'uploads-vapeshop-samarinda/sample3.jpg'),
('SMOK Nord 4', '<p>Pod kit dengan dual coil system dan kapasitas baterai besar 2000mAh.</p><ul><li>Kapasitas: 4.5ml</li><li>Baterai: 2000mAh</li><li>Output: 5-80W</li></ul>', 520000, 20, 'uploads-vapeshop-samarinda/sample4.jpg'),
('Liquid Salt Nic Premium', '<p>Liquid salt nicotine premium dengan berbagai rasa pilihan.</p><ul><li>Volume: 30ml</li><li>Nicotine: 25mg, 35mg, 50mg</li><li>Rasa: Mangga, Strawberry, Mint</li></ul>', 75000, 100, 'uploads-vapeshop-samarinda/sample5.jpg');