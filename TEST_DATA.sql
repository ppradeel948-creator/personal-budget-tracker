-- Test Data for Personal Budget Tracker
-- Run after RESET_DATABASE.sql

-- Insert test user
INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_active) VALUES
('testuser', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Test', 'User', 'PRIMARY_USER', TRUE);

-- Note: The password hash above is for 'password' - you can use this for testing
-- Username: testuser
-- Email: test@example.com  
-- Password: password

-- Insert sample categories for the test user
INSERT INTO categories (user_id, category_name, category_type, is_active) VALUES
(1, 'Salary', 'INCOME', TRUE),
(1, 'Freelance', 'INCOME', TRUE),
(1, 'Food & Dining', 'EXPENSE', TRUE),
(1, 'Transportation', 'EXPENSE', TRUE),
(1, 'Shopping', 'EXPENSE', TRUE),
(1, 'Entertainment', 'EXPENSE', TRUE),
(1, 'Bills & Utilities', 'EXPENSE', TRUE),
(1, 'Healthcare', 'EXPENSE', TRUE);

-- Insert sample budget
INSERT INTO budgets (user_id, budget_name, total_amount, period, start_date, end_date, is_active) VALUES
(1, 'Monthly Budget', 3000.00, 'MONTHLY', '2024-01-01', '2024-01-31', TRUE);

-- Insert sample transactions
INSERT INTO transactions (user_id, amount, transaction_type, category_id, description, transaction_date, payment_method) VALUES
(1, 5000.00, 'INCOME', 1, 'Monthly Salary', '2024-01-01', 'BANK_TRANSFER'),
(1, 50.00, 'EXPENSE', 3, 'Grocery Shopping', '2024-01-02', 'CARD'),
(1, 25.00, 'EXPENSE', 4, 'Bus Fare', '2024-01-03', 'CASH'),
(1, 100.00, 'EXPENSE', 5, 'Clothes Shopping', '2024-01-04', 'CARD');