CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    "userId" INTEGER REFERENCES "users"("id")
);

CREATE TABLE shortens (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"("id")
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    "shortId" INTEGER REFERENCES "shortens"("id"),
    visit INTEGER NOT NULL DEFAULT 0
);