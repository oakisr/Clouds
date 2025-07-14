-- Command to recreate db: sqlite3 users.db < recreate_users.sql

BEGIN TRANSACTION;

SELECT * FROM "user"
WHERE "email" = 's@e.com';

COMMIT;

