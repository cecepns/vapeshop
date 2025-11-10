-- Add category_id column to existing products table
-- This migration safely adds category support without affecting existing data

-- First, add the category_id column if it doesn't exist
ALTER TABLE products ADD COLUMN category_id INT NULL AFTER image;

-- Then add the foreign key constraint
ALTER TABLE products ADD CONSTRAINT fk_products_category 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- Verify the column was added successfully
-- SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='products' AND COLUMN_NAME='category_id';

