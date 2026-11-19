Assignment 3: Inventory and Data Management System

Name:
Roll No:
Course: Web Dev III
Date:

Setup
1. npm install
2. Check PORT and MONGO_URI in .env
3. npm run seed
4. npm start

Endpoints
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
PATCH  /api/products/:id/stock
DELETE /api/products/:id
GET    /api/products/low-stock
GET    /api/products/summary

Query params for GET /api/products
category, search, minPrice, maxPrice, sort, page, limit
