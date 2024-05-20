# Homework 8

## Subtitle: REST API

This REST API is designed using a class-based model approach to ensure clean and efficient database interaction. It supports basic CRUD (Create, Read, Update, Delete) operations and includes comprehensive validation for data received from the frontend. All data validation and database interactions are implemented within dedicated classes in models folder.

## Base URL

`https://library.webdevolek.stronawcal.pl/api/v1`

## Basic Routes for CRUD Operations

### Users:

- **GET /users** - Retrieve all users.
- **GET /users/:id** - Retrieve a single user by ID.
- **POST /users** - Create a new user.
- **PATCH /users/:id** - Update an existing user by ID.
- **DELETE /users/:id** - Delete a user by ID.

### Books:

- **GET /books** - Retrieve all books.
- **GET /books/:id** - Retrieve a single book by ID.
- **POST /books** - Create a new book.
- **PATCH /books/:id** - Update an existing book by ID.
- **DELETE /books/:id** - Delete a book by ID.

### Front-end:

- [live](https://homework8classes.netlify.app)
- [code](https://github.com/pologora/homework8)
