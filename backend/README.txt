# NoteFlow API — Week 4

A REST API built with **Node.js, Express.js, MongoDB, and Mongoose**. This week upgrades the Week 3 API by replacing temporary in-memory storage with persistent MongoDB storage.

## Technologies

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Postman

## Setup

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash
node server.js
```

Server:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/notes`     | Get all notes |
| GET    | `/api/notes/:id` | Get a note    |
| POST   | `/api/notes`     | Create a note |
| PUT    | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Note

Database credentials are stored in `.env` and should not be uploaded to GitHub.
