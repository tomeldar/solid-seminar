CREATE TABLE IF NOT EXISTS users(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE UNIQUE CONSTRAINT IF NOT EXISTS uq_users_username ON users(username, deleted_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
