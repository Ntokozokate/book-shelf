### Book Shelf

API, Analysis, Authentication and Authorization

A simple Node.js + Express + MongoDB CRUD + Authentication and Authorization backend for managing a collection of books. This project was built strictly as a backend practice app with no frontend.

## Project Goal

This project was built to deeply practice MongoDB and backend system design.
The focus was data modeling, querying, analytics, and access control.
Practice Role based Access to different routes to the book-shelf.
Dual token authentiication

## Key Concepts Practiced

BOOK MANAGEMENT

features

- Pagination & filtering
- MongoDB aggregation end points(calculating everage price, most expensive )
- Referencing and lookups
- Role-based access control
- API design & error handling

  ## AUTHENTICATION AND AUTHORIZATION

  features
  User authentication(signup, login logout)
  JWT-based Access and Refresh Tokens
  Storing refresh tokens in httpOnly cookies
  Role based Access to routes

  # AUTH FLOW \*\*register/login

  User enters personal details,
  user data is verified
  password is hashed using bcrypt
  User is stored with default role(user) and hashed password
  Two tokens are generated, 1 Access token(short lived) s stored in memory
  the other Refresh token (long lived)is stored in HttpOnly cookie
  In testing refresh token is used to access protected routes around the bookshelf API

## Tech stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser
- cors
- dotenv

Users have different roles:

- USER: read-only access
- ADMIN: full book & author management
- AUTHOR (planned): limited profile editing

# Authentication controller

# Running the Project

1. Install dependencies:npm install
2. Start development server:npm run dev
3. Start production server:npm start

The server runs on:

http://localhost:3008
