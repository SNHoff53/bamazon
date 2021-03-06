DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO INCREMENT,
    product_name VARCHAR(100) NULL, 
    department_name VARCHAR(100) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
 );

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11", "candle", "Home", "20.99", "20");