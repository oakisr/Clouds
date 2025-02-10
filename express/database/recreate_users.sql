-- Command to recreate db: sqlite3 users.db < recreate_users.sql

BEGIN TRANSACTION;

-- Drop tables if they exist, starting with the dependent table to avoid foreign key constraint issues
DROP TABLE IF EXISTS user;

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS "user"
(
    "id"   INTEGER,
    "name" TEXT NOT NULL,
    "email"     TEXT NOT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "admin"
(
    "pin"  INTEGER,
    "credential" TEXT NOT NULL,
    PRIMARY KEY ("pin" AUTOINCREMENT)
);

-- INSERT TEST DATA

INSERT INTO "user" ("name", "email")
VALUES ('klelto', 'M'); --user_id = 1

INSERT INTO "admin" ("credential")
VALUES ('$2b$10$JulaLQGweV/otn/RvFa.9OPQGjCtv2oG1dVeF6e5q6h8XN3C5.Dp2'); --credential = admin

COMMIT;

