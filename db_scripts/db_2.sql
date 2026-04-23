ALTER TABLE "users"
DROP COLUMN IF EXISTS "name",
DROP COLUMN IF EXISTS "phone",
ADD COLUMN IF NOT EXISTS "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN IF NOT EXISTS "last_name" VARCHAR(255) NOT NULL;

CREATE TABLE IF NOT EXISTS "user_details" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  creating_for VARCHAR(20) NOT NULL DEFAULT 'myself',
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  products TEXT[],
  services TEXT[],
  cash_donation DECIMAL(10, 2),
  journey TEXT,
  street_address TEXT,
  address_line TEXT,
  city VARCHAR(150),
  state VARCHAR(150),
  zip_code VARCHAR(10),
  privacy_settings TEXT[],
  terms_policy BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "product_types" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
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

ALTER TABLE "products"
ADD COLUMN IF NOT EXISTS category VARCHAR(255),
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE "products"
DROP COLUMN IF EXISTS is_service;

ALTER TABLE "gift_wells"
ALTER COLUMN title DROP NOT NULL;

ALTER TABLE "registry_items"
ADD COLUMN IF NOT EXISTS priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS order_index INT NOT NULL;

CREATE TABLE IF NOT EXISTS "services" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "user_details"
ALTER COLUMN "products" TYPE INTEGER[] USING products::INTEGER[];

ALTER TABLE "user_details"
ALTER COLUMN "services" TYPE INTEGER[] USING services::INTEGER[];

ALTER TABLE "products"
ALTER COLUMN "category" TYPE INTEGER USING category::INTEGER;

ALTER TABLE "donations"
DROP COLUMN IF EXISTS donor_name,
DROP COLUMN IF EXISTS donor_email,
DROP COLUMN IF EXISTS anonymous;

ALTER TABLE "donations"
ADD COLUMN IF NOT EXISTS user_id INTEGER NOT NULL,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(10) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed'));

ALTER TABLE "donations"
ADD CONSTRAINT donations_user_id_fkey FOREIGN KEY (user_id) REFERENCES "users"(id) ON DELETE CASCADE;

ALTER TABLE "registry_items"
ADD COLUMN IF NOT EXISTS registry_product JSONB;

ALTER TABLE "registry_items"
ADD COLUMN IF NOT EXISTS product_id INTEGER;


ALTER TABLE "products"
ADD COLUMN IF NOT EXISTS "is_affiliated" BOOLEAN DEFAULT FALSE;

ALTER TABLE "donations"
ADD COLUMN IF NOT EXISTS title VARCHAR,
ADD COLUMN IF NOT EXISTS "donation_method" VARCHAR;

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
