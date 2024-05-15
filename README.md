# To-Do-List

This project is a web application that includes both backend and frontend components. It provides user authentication and a simple to-do list functionality.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Manjeedan11/To-do-list
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install backend dependencies:

   ```bash
   npm install cors dotenv express mongoose nodemon
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The server will start listening on port 5000 and connect to the MongoDB database.

6. Open another terminal window and navigate to the frontend directory:

   ```bash
   cd ../frontend/auth
   ```

7. Start the UI using live server:

   ```bash
   live-server
   ```

8. Your default web browser will open automatically, and you will be directed to the authentication page.

9. If the browser does not open automatically, you can manually navigate to `http://localhost:5500/frontend/auth/index.html` to view the authentication page.

## Usage

- **Authentication**: The authentication page allows users to log in or sign up. Upon successful authentication, users are redirected to the to-do list page.
- **To-Do List**: Users can add, edit, check, and delete tasks. Task data is stored in a MongoDB database.
- **Logout**: Users can log out of their accounts from the to-do list page.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), dotenv
- **Frontend**: HTML, CSS, JavaScript
- **Other Tools**: Live Server (for local development)

