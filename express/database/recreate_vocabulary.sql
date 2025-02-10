-- Command to recreate db: sqlite3 vocabulary.db < recreate_vocabulary.sql

BEGIN TRANSACTION;

-- Drop tables if they exist, starting with the dependent table to avoid foreign key constraint issues
DROP TABLE IF EXISTS user;

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS "user"
(
    "word_id"   INTEGER,
    "english" TEXT NOT NULL,
    "french"     TEXT NOT NULL,
    "spanish"     TEXT NOT NULL,
    "part_of_language"     TEXT NOT NULL,
    "subtype"     TEXT NOT NULL,
    PRIMARY KEY ("word_id" AUTOINCREMENT)
);

COMMIT;

