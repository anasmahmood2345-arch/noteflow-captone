# NoteFlow

A full-stack MERN note management application with user authentication.

## Problem / Idea

NoteFlow allows users to securely create, view, edit, update, and delete their personal notes through a simple web application.

## Features

* User signup and login
* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* User-specific notes
* Create, view, edit, update, and delete notes
* Form validation
* Loading and error handling
* Responsive design
* MongoDB Atlas database
* Logout functionality

## Technologies

* React
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* bcrypt
* JSON Web Token (JWT)
* CSS

## Project Structure

```text
noteflow-auth/
├── backend/
└── frontend/
```

## Backend Setup

Open the backend folder:

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:3000
```

## Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload `.env` or any secrets to GitHub.

## API Endpoints

### Authentication

* `POST /api/auth/signup` — Register a user
* `POST /api/auth/login` — Login and receive a JWT

### Notes

* `GET /api/notes` — Get the logged-in user's notes
* `GET /api/notes/:id` — Get one note
* `POST /api/notes` — Create a note
* `PUT /api/notes/:id` — Update a note
* `PATCH /api/notes/:id` — Partially update a note
* `DELETE /api/notes/:id` — Delete a note




