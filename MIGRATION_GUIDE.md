# 📋 Panduan Migration Database

## Scenario 1: Fresh Installation (Database Kosong)
Jika database belum ada atau kosong, jalankan migration utama:

```bash
# Jalankan migration utama yang membuat semua table dari awal
mysql -u root -p < supabase/migrations/20250916161059_warm_pine.sql
```

**Apa yang terjadi:**
- ✅ Membuat database `vape_shop_db`
- ✅ Membuat table `categories`
- ✅ Membuat table `products` (TANPA `category_id`)
- ✅ Membuat table `settings`
- ✅ Membuat table `contact_messages`
- ✅ Insert default data (settings, categories, sample products)

---

## Scenario 2: Database Sudah Ada dengan Data (Most Common)
Jika table `products` sudah ada dengan data yang tidak ingin dihapus:

### Step 1: Pastikan table `categories` ada
```bash
mysql -u root -p < supabase/migrations/20250916161059_warm_pine.sql
```

### Step 2: Tambahkan kolom `category_id` ke table `products`
```bash
mysql -u root -p < supabase/migrations/20250918_add_category_to_products.sql
```

**Apa yang terjadi:**
- ✅ Menambahkan kolom `category_id` ke table `products` (di antara `image` dan `created_at`)
- ✅ Semua data yang sudah ada TETAP AMAN
- ✅ Kolom `category_id` awalnya `NULL` untuk semua produk yang sudah ada
- ✅ Menambahkan foreign key constraint ke table `categories`

---

## Query Manual (Jika perlu manual execution)

### Menambahkan kolom `category_id` ke table `products` yang sudah ada:
```sql
ALTER TABLE products ADD COLUMN category_id INT NULL AFTER image;
```

### Menambahkan foreign key:
```sql
ALTER TABLE products ADD CONSTRAINT fk_products_category 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
```

### Memverifikasi perubahan:
```sql
DESCRIBE products;
-- atau
SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME='products' AND COLUMN_NAME='category_id';
```

### Update kategori untuk produk yang sudah ada (Optional):
```sql
-- Contoh: Assign kategori 'Pod System' (id=1) untuk produk tertentu
UPDATE products 
SET category_id = 1 
WHERE name LIKE '%Pod%';

-- Assign kategori 'Liquid' (id=3) untuk produk liquid
UPDATE products 
SET category_id = 3 
WHERE name LIKE '%Liquid%';
```

---

## File Migration Dijelaskan

### 📄 `20250916161059_warm_pine.sql` (Initial Migration)
- **Tujuan**: Setup database dari awal (fresh install)
- **Isi**:
  - CREATE DATABASE
  - CREATE TABLE categories
  - CREATE TABLE products (WITHOUT category_id untuk compatibility)
  - CREATE TABLE settings
  - CREATE TABLE contact_messages
  - INSERT default data

### 📄 `20250918_add_category_to_products.sql` (Addendum Migration)
- **Tujuan**: Tambahkan kategori support ke database yang sudah ada
- **Isi**:
  - ALTER TABLE products ADD COLUMN category_id
  - ALTER TABLE products ADD FOREIGN KEY
- **Keamanan**: Tidak menghapus atau mengubah data yang sudah ada

---

## ⚠️ Penting Diingat

1. **ALTER TABLE tidak menghapus data**: Ketika menambahkan kolom baru dengan `ALTER TABLE`, semua data yang sudah ada tetap aman. Kolom baru akan memiliki nilai `NULL` untuk record yang sudah ada.

2. **ON DELETE SET NULL**: Jika kategori dihapus, `category_id` di produk akan menjadi `NULL`, bukan menghapus produk.

3. **Urutan Eksekusi**: Jika menggunakan Scenario 2, pastikan:
   - Jalankan `20250916161059_warm_pine.sql` DULU (untuk memastikan categories table ada)
   - Kemudian jalankan `20250918_add_category_to_products.sql` (untuk add column)

4. **Backward Compatible**: Aplikasi sudah diupdate untuk menangani `category_id = NULL`. Produk tanpa kategori akan ditampilkan dengan "-" di kategori.

---

## Debugging

### Cek apakah kolom sudah ada:
```sql
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME='products' AND COLUMN_NAME='category_id';
```

### Cek struktur table products:
```sql
DESCRIBE products;
-- atau
SHOW CREATE TABLE products;
```

### Cek foreign key:
```sql
SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME='products' AND REFERENCED_TABLE_NAME='categories';
```

---

## Summary

| Situasi | Command | File |
|---------|---------|------|
| Fresh Install | `mysql ... < 20250916161059_warm_pine.sql` | ✅ Buat semua table |
| Existing DB | `mysql ... < 20250916161059_warm_pine.sql` (jika belum ada categories) | ✅ Buat categories |
| Existing DB | `mysql ... < 20250918_add_category_to_products.sql` | ✅ Add category_id ke products |
| Manual Query | `ALTER TABLE products ADD COLUMN...` | 🔧 Jika perlu custom |


