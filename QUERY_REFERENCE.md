# 🔧 Query Reference - Alterasi Table Products

## Permasalahan
Database sudah ada dengan table `products` yang sudah berisi data. Sekarang ingin menambahkan support kategori TANPA menghapus data yang sudah ada.

---

## Solusi: Gunakan ALTER TABLE

### ✅ Query 1: Tambah Kolom `category_id`
```sql
ALTER TABLE products ADD COLUMN category_id INT NULL AFTER image;
```

**Penjelasan:**
- `ALTER TABLE products` = Ubah table products
- `ADD COLUMN category_id INT NULL` = Tambah kolom baru dengan tipe INT dan allow NULL
- `AFTER image` = Posisikan setelah kolom `image`

**Hasil:**
```
BEFORE:
id | name | description | price | stock | image | created_at | updated_at

AFTER:
id | name | description | price | stock | image | category_id | created_at | updated_at
                                                    ^^^^^^^^^
                                                    KOLOM BARU
```

---

### ✅ Query 2: Tambah Foreign Key Constraint
```sql
ALTER TABLE products ADD CONSTRAINT fk_products_category 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
```

**Penjelasan:**
- `ADD CONSTRAINT fk_products_category` = Tambah constraint dengan nama `fk_products_category`
- `FOREIGN KEY (category_id)` = Tentukan kolom yang akan direferensikan
- `REFERENCES categories(id)` = Referensi ke kolom `id` di table `categories`
- `ON DELETE SET NULL` = Jika kategori dihapus, set `category_id` menjadi NULL (bukan menghapus produk)

**Benefit:**
- Data integrity terjaga
- Tidak bisa insert `category_id` yang tidak ada di categories
- Jika kategori dihapus, produk tetap ada tapi kategori jadi NULL

---

### ❌ Query yang SALAH (Don't Do This!)
```sql
-- ❌ JANGAN - Akan menghapus semua data!
DROP TABLE products;
CREATE TABLE products (
  ...
  category_id INT NULL,
  ...
);
```

---

## Verifikasi Berhasil

### Cek struktur table:
```sql
DESCRIBE products;
```

**Output yang diharapkan:**
```
Field           | Type        | Null | Key | Default | Extra
id              | int         | NO   | PRI | NULL    | auto_increment
name            | varchar(255)| NO   |     | NULL    |
description     | longtext    | NO   |     | NULL    |
price           | decimal(10,2)| NO  |     | NULL    |
stock           | int         | NO   |     | 0       |
image           | varchar(500)| YES  |     | NULL    |
category_id     | int         | YES  | MUL | NULL    |  ← BARU!
created_at      | timestamp   | NO   |     | CURRENT |
updated_at      | timestamp   | NO   |     | CURRENT |
```

---

### Cek apakah kolom `category_id` ada:
```sql
SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME='products' AND COLUMN_NAME='category_id';
```

**Output yang diharapkan:**
```
COLUMN_NAME | COLUMN_TYPE | IS_NULLABLE
category_id | int(11)     | YES
```

---

### Cek foreign key:
```sql
SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME='products';
```

**Output yang diharapkan:**
```
CONSTRAINT_NAME         | COLUMN_NAME | REFERENCED_TABLE_NAME | REFERENCED_COLUMN_NAME
PRIMARY               | id          | NULL                  | NULL
fk_products_category  | category_id | categories            | id
```

---

## Workflow Lengkap

### Step 1: Pastikan kategori table ada
```bash
# Buat categories table dan insert data
mysql -u root -p vape_shop_db < supabase/migrations/20250916161059_warm_pine.sql
```

### Step 2: Alterasi products table
```bash
# Tambah kategori support ke products
mysql -u root -p vape_shop_db < supabase/migrations/20250918_add_category_to_products.sql
```

### Step 3 (Optional): Assign kategori ke produk yang ada
```sql
-- Jika ingin auto-assign kategori berdasarkan nama produk

-- Assign Pod System (id=1)
UPDATE products 
SET category_id = 1 
WHERE name LIKE '%Pod%' AND category_id IS NULL;

-- Assign Starter Kit (id=2)
UPDATE products 
SET category_id = 2 
WHERE name LIKE '%Kit%' AND category_id IS NULL;

-- Assign Liquid (id=3)
UPDATE products 
SET category_id = 3 
WHERE name LIKE '%Liquid%' AND category_id IS NULL;
```

### Step 4: Verifikasi
```sql
-- Lihat produk dengan kategori
SELECT p.id, p.name, c.name as category_name 
FROM products p 
LEFT JOIN categories c ON p.category_id = c.id;
```

---

## Keuntungan ALTER TABLE vs CREATE TABLE

| Aspek | ALTER TABLE | CREATE TABLE (Drop) |
|-------|-------------|-------------------|
| Data Existing | ✅ AMAN - Tetap ada | ❌ HILANG - Semua terhapus |
| Waktu Eksekusi | ⚡ Cepat | 🐢 Lambat (harus re-insert) |
| Risiko | ✅ Minimal | ❌ Sangat tinggi |
| Downtime | ✅ Minimal | ❌ Aplikasi harus offline |
| Rekomendasi | ✅ GUNAKAN INI! | ❌ Hanya untuk dev/testing |

---

## Troubleshooting

### Error: "Duplicate entry for key 'fk_products_category'"
```
Penyebab: Foreign key sudah ada
Solusi: Jalankan saja sekali. Jika error, berarti sudah ada.
```

### Error: "Specified key was too long"
```
Penyebab: Batasan key length di MySQL
Solusi: Gunakan INT untuk category_id (sudah benar di query kami)
```

### Error: "Cannot add or update a child row"
```
Penyebab: Ada category_id yang tidak ada di categories table
Solusi: Pastikan INSERT categories sudah dijalankan terlebih dahulu
```

---

## Summary Query

**UNTUK DATABASE YANG SUDAH ADA:**

```sql
-- 1. Add column
ALTER TABLE products ADD COLUMN category_id INT NULL AFTER image;

-- 2. Add foreign key
ALTER TABLE products ADD CONSTRAINT fk_products_category 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- 3. (Optional) Assign kategori ke produk yang ada
UPDATE products SET category_id = 1 WHERE name LIKE '%Pod%';
```

**Selesai! Data tetap aman, kategori support sudah ditambahkan.** ✅


