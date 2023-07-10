CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    password TEXT NOT NULL, 
    username TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
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
CREATE TABLE following(
    id SERIAL PRIMARY KEY,
    follows TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE exercise(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration FLOAT NOT NULL,
    calories_burned INT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE sleep(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    duration FLOAT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
