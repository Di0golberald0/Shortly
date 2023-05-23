CREATE TABLE users (
	"id" serial NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
	"id" serial NOT NULL PRIMARY KEY,
	"token" TEXT NOT NULL,
	"active" BOOLEAN NOT NULL DEFAULT true,
	"userId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE shortens (
	"id" serial NOT NULL PRIMARY KEY,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"views" integer NOT NULL DEFAULT 0
);