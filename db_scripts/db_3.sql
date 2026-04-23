ALTER TABLE "registry_items"
ADD COLUMN IF NOT EXISTS status VARCHAR(10) DEFAULT 'listed' CHECK (status IN ('listed', 'purchased'));

ALTER TABLE "user_details"
ADD COLUMN IF NOT EXISTS attachments TEXT[] NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS "support_messages" (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "payment_details" (
  id SERIAL PRIMARY KEY,
  donation_id INTEGER NOT NULL,
  stripe_id VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NULL,
  amount DECIMAL(10, 2) NOT NULL,
  cardholder_name VARCHAR(255) NULL,
  last_four_digits VARCHAR(4) NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'processing')),
  currency VARCHAR(3) DEFAULT 'usd',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS public_url VARCHAR(255) UNIQUE;

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

CREATE TABLE IF NOT EXISTS "registry_services" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  registry_service JSONB,
  order_index INTEGER NOT NULL,
  is_claimed BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('listed', 'availed')) DEFAULT 'listed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "blog_categories" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "blogs" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  category INTEGER[] NOT NULL DEFAULT '{}',
  attachments TEXT[] NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "blogs"
ADD COLUMN IF NOT EXISTS featured_image VARCHAR(255);

INSERT INTO "blog_categories" (name, description)
VALUES
  ('Support', 'Support-related blog posts'),
  ('Tutorial', 'Tutorials and guides'),
  ('Giftwell', 'Content related to Giftwell'),
  ('Careful', 'Careful and mindful living content'),
  ('Category', 'General category posts'),
  ('Gifts', 'Gift ideas and suggestions'),
  ('Payment', 'Payment and transaction-related posts');
