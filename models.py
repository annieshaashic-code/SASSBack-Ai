"""
Models / Schema definitions for AI Fairy Godmother app.
Uses SQLite via the sqlite3 standard library (no ORM needed for hackathon speed).
"""

CREATE_TABLES_SQL = """
-- Users table (anonymous by default; nickname optional)
CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname    TEXT    DEFAULT 'Fairy Fan',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Incidents: every time someone gets a comeback generated
CREATE TABLE IF NOT EXISTS incidents (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER REFERENCES users(id),
    scenario        TEXT    NOT NULL,           -- raw user input
    category        TEXT    DEFAULT 'general',  -- e.g. mansplaining, interruption, outfit comment
    humor_level     INTEGER DEFAULT 5,          -- 1-10 slider value
    response        TEXT,                        -- AI-generated comeback
    emoji_rating    TEXT,                        -- user reaction emoji
    shared          INTEGER DEFAULT 0,          -- 0/1: shared to community?
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Community posts (anonymous story sharing)
CREATE TABLE IF NOT EXISTS community_posts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id INTEGER REFERENCES incidents(id),
    story       TEXT    NOT NULL,
    likes       INTEGER DEFAULT 0,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insights cache (updated periodically per user)
CREATE TABLE IF NOT EXISTS insights (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER REFERENCES users(id),
    summary     TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
"""
