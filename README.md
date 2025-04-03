# Tripleten Web Project API Full

This project is a full-stack web application that provides a platform for users to register, log in, and manage cards. Users can create, edit, like, and delete cards. The application includes a backend API and a React-based frontend.

## Features

- **User Authentication**: Registration and login functionality with JWT-based authentication.
- **Card Management**: Create, edit, like, and delete cards.
- **Responsive Design**: Optimized for various screen sizes.
- **Error Handling**: Comprehensive error handling and logging.
- **Secure Backend**: Built with Express.js and MongoDB.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for creating the API.
- **MongoDB**: NoSQL database for storing user and card data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Celebrate**: Request validation middleware.
- **Winston**: Logging library.

### Frontend

- **React.js**: JavaScript library for building the user interface.
- **React Router**: For client-side routing.
- **CSS**: Styling for the application.
- **LocalStorage**: For managing authentication tokens.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running locally.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   DB_AROUND=arounddb
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Create, edit, like, or delete cards.

## Project Structure

### Backend

- **`controllers/`**: Contains logic for handling API requests.
- **`models/`**: Mongoose schemas for users and cards.
- **`routes/`**: API routes for users and cards.
- **`middlewares/`**: Middleware for authentication, validation, and error handling.

### Frontend

- **`components/`**: React components for the UI.
- **`utils/`**: Utility functions for API calls and authentication.
- **`blocks/`**: CSS files for styling.

## Scripts

### Backend

- `npm start`: Start the backend server.
- `npm run dev`: Start the backend server in development mode.
- `npm test`: Run backend tests.

### Frontend

- `npm start`: Start the frontend development server.
- `npm run build`: Build the frontend for production.

## License

This project is licensed under the ISC License.

---

Developed by **May Donoban Espitia Pineda**.
