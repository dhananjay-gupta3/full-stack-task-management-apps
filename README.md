Restaurant Management System
This is a Restaurant Management System built with a React frontend and an Express backend. It allows users to register, log in, view the menu, place orders, and view their order history. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

Features
Backend
User authentication (register, login, refresh token).
Menu management (add, update, delete menu items).
Order management (place orders, view order history).
JWT-based authentication for protected routes.
MongoDB for data storage.

Frontend
User registration and login.
View the menu with search bar.
Add items to the cart and place orders.
View order history.
Responsive design with a clean UI.

Setup Instructions
1. Clone the Repository
https://github.com/dhananjay-gupta3/full-stack-task-management-apps
cd restaurant-management-system

2. Backend Setup
Install Dependencies
Navigate to the backend folder and install dependencies
cd backend
npm install

Set Up Environment Variables
Create a .env file in the backend folder and add the following variables:
PORT=5000
MONGO_URI=mongo_url
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

Run the Backend
Start the backend server:
nodemon index.js

3. Frontend Setup
Install Dependencies
Navigate to the frontend folder and install dependencies:
cd ../frontend
npm install

go to the server file change the backend_url = "http://localhost:5000"

Run the Frontend
Start the frontend development server:
npm start
The frontend will run on http://localhost:3000.


API Endpoints
Menu
GET /menu: Get all menu items.
POST /menu: Add a new menu item (protected).
PUT /menu/:id : Update a menu item (protected).
DELETE /menu/:id : Delete a menu item (protected).

Orders
POST /order: Place an order (protected).
GET /orders: Get order history for the logged-in user (protected).

Frontend Routes
/: Home page (redirects to /register).
/menu: View the menu.
/order: Place an order.
/order-history: View order history.
/register: User registration.
/login: User login.


Technologies Used
Backend
Node.js: JavaScript runtime.
Express: Web framework for Node.js.
MongoDB: NoSQL database.
Mongoose: MongoDB object modeling for Node.js.
JWT: JSON Web Tokens for authentication.

Frontend
React: JavaScript library for building user interfaces.
React Router: Routing for React applications.
Axios: HTTP client for making API requests.
CSS: Styling for the frontend.

