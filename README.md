# Book Shelf API and analysis

A simple Node.js + Express + MongoDB CRUD + Authentication and Authorization backend for managing a collection of books. This project was built strictly as a backend practice app with no frontend.

## Project Goal

This project was built to deeply practice MongoDB and backend system design.
The focus was data modeling, querying, analytics, and access control.
Practice Role based Access to different routes to the book-shelf.

### Node.js, Express.js, MongoDb and Mongoose, bcrypt, jsonwebtokens,

## Key Concepts Practiced

- Pagination & filtering
- MongoDB aggregation pipelines
- Referencing and lookups
- Role-based access control
- Secure JWT authentication
- API design & error handling

## Authentication & Authorization

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
