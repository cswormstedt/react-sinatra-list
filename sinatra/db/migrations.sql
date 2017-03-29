-- psql -a -f migrations.sql

CREATE DATABASE list;

\c list;

CREATE TABLE items (id SERIAL PRIMARY KEY, title varchar(255));
