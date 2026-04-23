CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL CHECK (role IN ('Administrator', 'Recipient', 'Donor')),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "gift_wells" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  privacy VARCHAR(10) DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "products" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  affiliate_link TEXT,
  image_url TEXT,
  is_service BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "registry_items" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL REFERENCES "gift_wells"(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES "products"(id),
  quantity INTEGER DEFAULT 1,
  is_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "donations" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL REFERENCES "gift_wells"(id) ON DELETE CASCADE,
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
