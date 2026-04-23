
  CREATE TABLE IF NOT EXISTS "roles" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tag TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO "roles" (name, tag)
VALUES 
  ('Administrator', 'administrator'),
  ('Caregiver', 'caregiver'),
  ('Recipient', 'recipient');

  ALTER TABLE "users"
DROP COLUMN IF EXISTS role;

ALTER TABLE "users"
ADD COLUMN role_id INTEGER;

UPDATE "users"
SET role_id = 3
WHERE role_id IS NULL;

CREATE TABLE IF NOT EXISTS "articles" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  category INTEGER[] NOT NULL DEFAULT '{}',
  attachments TEXT[] NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  featured_image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "users"
ADD COLUMN is_deleted BOOLEAN DEFAULT false;

CREATE TABLE IF NOT EXISTS "care_givers" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE care_givers ADD COLUMN role_id INTEGER;
