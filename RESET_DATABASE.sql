-- Reset Database for Personal Budget Tracker
-- Run these commands in your MySQL database

-- Drop existing tables
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- Create Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    role ENUM('PRIMARY_USER', 'FAMILY_MEMBER', 'FINANCIAL_ADVISOR', 'DEPENDENT_USER', 'GUEST') DEFAULT 'PRIMARY_USER',
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create Categories table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    category_type ENUM('INCOME', 'EXPENSE') NOT NULL,
    parent_category_id BIGINT NULL,
    budget_limit DECIMAL(15,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create Budgets table
CREATE TABLE budgets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    budget_name VARCHAR(100) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    period ENUM('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY') DEFAULT 'MONTHLY',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Transactions table
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_type ENUM('INCOME', 'EXPENSE', 'TRANSFER') NOT NULL,
    category_id BIGINT NULL,
    description VARCHAR(255),
    transaction_date DATE NOT NULL,
    payment_method ENUM('CASH', 'CARD', 'BANK_TRANSFER', 'CHECK', 'OTHER') DEFAULT 'CASH',
    receipt_image_url VARCHAR(500),
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NULL,
    tags VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert default categories for new users
INSERT INTO categories (user_id, category_name, category_type, is_active) VALUES
(1, 'Salary', 'INCOME', TRUE),
(1, 'Food & Dining', 'EXPENSE', TRUE),
(1, 'Transportation', 'EXPENSE', TRUE),
(1, 'Shopping', 'EXPENSE', TRUE),
(1, 'Entertainment', 'EXPENSE', TRUE),
(1, 'Bills & Utilities', 'EXPENSE', TRUE);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_categories_user ON categories(user_id);
CREATE INDEX idx_budgets_user ON budgets(user_id);