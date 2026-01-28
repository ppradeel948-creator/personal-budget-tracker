-- Truncate all tables for Personal Budget Tracker
-- Run these commands in your MySQL database

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE transactions;
TRUNCATE TABLE categories;
TRUNCATE TABLE budgets;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;