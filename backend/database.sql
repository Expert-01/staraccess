-- Celebrity Browser Database Schema
-- PostgreSQL

-- Create Tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    celebrity_id INTEGER NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(50) NOT NULL, -- 'fan_card', 'membership_card', 'call_permit', 'vip_access', 'meet_and_greet'
    has_tiers BOOLEAN DEFAULT FALSE, -- true for items with Bronze/Silver/Gold/Platinum tiers
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Item price tiers (for items with multiple price levels)
CREATE TABLE IF NOT EXISTS item_tiers (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    tier_name VARCHAR(50) NOT NULL, -- 'bronze', 'silver', 'gold', 'platinum', 'standard' (for Call Permit)
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_id, tier_name)
);

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

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE SET NULL,
    item_tier_id INTEGER REFERENCES item_tiers(id) ON DELETE SET NULL,
    celebrity_id INTEGER REFERENCES celebrities(id) ON DELETE SET NULL,
    item_name VARCHAR(255) NOT NULL,
    tier_name VARCHAR(50), -- e.g., 'bronze', 'silver', 'gold', 'platinum', 'standard'
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_celebrities_name ON celebrities(name);
CREATE INDEX IF NOT EXISTS idx_celebrities_category ON celebrities(category);
CREATE INDEX IF NOT EXISTS idx_items_celebrity_id ON items(celebrity_id);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(item_type);
CREATE INDEX IF NOT EXISTS idx_item_tiers_item_id ON item_tiers(item_id);
CREATE INDEX IF NOT EXISTS idx_item_tiers_tier_name ON item_tiers(tier_name);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_item_id ON order_items(item_id);
CREATE INDEX IF NOT EXISTS idx_order_items_celebrity_id ON order_items(celebrity_id);

-- Create Constraints
ALTER TABLE users ADD CONSTRAINT chk_email_format CHECK (email LIKE '%@%.%');
ALTER TABLE orders ADD CONSTRAINT chk_status_value CHECK (status IN ('pending', 'completed', 'cancelled'));
ALTER TABLE items ADD CONSTRAINT chk_item_type CHECK (item_type IN ('fan_card', 'membership_card', 'call_permit', 'vip_access', 'meet_and_greet'));
ALTER TABLE item_tiers ADD CONSTRAINT chk_tier_price_positive CHECK (price > 0);
ALTER TABLE item_tiers ADD CONSTRAINT chk_tier_stock_non_negative CHECK (stock >= 0);
ALTER TABLE item_tiers ADD CONSTRAINT chk_tier_name CHECK (tier_name IN ('bronze', 'silver', 'gold', 'platinum', 'standard'));
