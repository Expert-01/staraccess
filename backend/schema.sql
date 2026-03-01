-- Celebrity Browser Database Schema
-- PostgreSQL - Supabase
-- This schema creates all tables needed for the Celebrity Browser application

-- ============ Users Table ============
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Celebrities Table ============
CREATE TABLE IF NOT EXISTS celebrities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    bio TEXT,
    image VARCHAR(500),
    followers INTEGER,
    years_active VARCHAR(50),
    response_time VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Items Table ============
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    celebrity_id INTEGER NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image VARCHAR(500),
    item_category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Orders Table ============
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Order Items Table ============
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Create Indexes ============
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_celebrities_name ON celebrities(name);
CREATE INDEX IF NOT EXISTS idx_items_celebrity_id ON items(celebrity_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_item_id ON order_items(item_id);

-- ============ Sample Data (Optional - Comment out if not needed) ============

-- Insert sample celebrities
INSERT INTO celebrities (name, category, bio, image, followers, years_active, response_time) VALUES
    ('Taylor Swift', 'Music', 'Grammy-winning singer-songwriter', '/celebrity1.jpg', 195000000, '2006-present', '2-3 weeks'),
    ('Dwayne Johnson', 'Entertainment', 'Actor and former professional wrestler', '/celebrity2.jpg', 390000000, '1996-present', '1-2 weeks'),
    ('Ariana Grande', 'Music', 'Pop singer and actress', '/celebrity3.jpg', 280000000, '2008-present', '2-3 weeks')
ON CONFLICT (name) DO NOTHING;

-- Insert sample items for celebrities
INSERT INTO items (celebrity_id, name, description, price, stock, item_category) VALUES
    (1, 'Fan Card', 'Autographed collector card', 29.99, 100, 'fan-card'),
    (1, 'Meet & Greet', '30-minute meet and greet session', 499.99, 5, 'meet-greet'),
    (1, 'Call Permit', 'Direct phone call with Taylor', 799.99, 3, 'call-permit'),
    (2, 'Fan Card', 'Autographed collector card', 24.99, 150, 'fan-card'),
    (2, 'VIP Access', 'Exclusive VIP event access', 1299.99, 10, 'vip-access'),
    (3, 'Meet & Greet', '30-minute meet and greet session', 449.99, 8, 'meet-greet')
ON CONFLICT DO NOTHING;

-- ============ Verification Queries ============
-- Run these after import to verify everything is set up correctly:
-- SELECT COUNT(*) FROM users;
-- SELECT COUNT(*) FROM celebrities;
-- SELECT COUNT(*) FROM items;
-- SELECT COUNT(*) FROM orders;
