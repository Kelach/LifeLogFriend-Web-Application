CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    password TEXT NOT NULL, 
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NULL NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
CREATE TABLE nutrition(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
-- CREATE TABLE sleep(
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     category TEXT NOT NULL,
--     calories TEXT NOT NULL,
--     image_url TEXT NOT NULL,
--     user_id TEXT NOT NULL,
--     created_at TIMESTAMP NOT NULL,
-- )
-- CREATE TABLE exercise(
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     category TEXT NOT NULL,
--     calories TEXT NOT NULL,
--     image_url TEXT NOT NULL,
--     user_id TEXT NOT NULL,
--     created_at TIMESTAMP NOT NULL,
-- )
