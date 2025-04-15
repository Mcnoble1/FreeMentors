CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  address TEXT NOT NULL,
  bio TEXT,
  occupation TEXT,
  expertise TEXT,
  role VARCHAR(10) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES users(id),
  mentee_id INTEGER REFERENCES users(id),
  questions TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id),
  mentee_id INTEGER REFERENCES users(id),
  mentor_id INTEGER REFERENCES users(id),
  score INTEGER,
  remark TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
