Crowdfunding Application

This is a full-stack crowdfunding application where users can browse, invest in various business projects, and manage their profiles. Users can register, log in, and securely invest in projects. Business owners can list projects, while investors can view project details and track investment progress.

Features

User Authentication: Secure registration and login system using JWT tokens.
Business Listings: Users can browse and view detailed information about various business projects.
Investment: Logged-in users can invest in projects, with the amount contributing to the project's funding progress.
Profile Management: Users can manage their profiles, including updating personal information and uploading a profile image.
Technologies Used

Frontend: React, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB, Mongoose
Authentication: JSON Web Tokens (JWT)
File Uploads: Multer for handling profile image uploads
Installation

Prerequisites
Node.js and npm installed
MongoDB instance (local or cloud)
Backend Setup
Clone the repository and navigate to the backend directory:
bash
Copy code
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository/server
Install backend dependencies:
bash
Copy code
npm install
Create a .env file in the server directory and configure the following environment variables:
plaintext
Copy code
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
Start the backend server:
bash
Copy code
node index.js
The server will run on http://localhost:5001 by default.
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../client
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
npm run dev
The frontend will run on http://localhost:5173 by default.
Usage

1. Registration and Login
Go to http://localhost:5173 and register as a new user.
Log in with your credentials to receive an authentication token. This token is stored in localStorage.
2. Browsing and Investing in Projects
After logging in, navigate to the Business Listings page to view available projects.
Click on a project card to view more details, including funding progress and investment options.
Enter an investment amount and submit to contribute to the project's funding.
3. Profile Management
Navigate to your profile page to update your personal information.
Upload a profile image if desired, and save changes. The updated information will reflect in the database.
Project Structure

plaintext
Copy code
.
├── client                   # Frontend React application
│   ├── public               # Public assets
│   └── src
│       ├── components       # Reusable UI components
│       ├── pages            # Application pages
│       ├── App.jsx          # Main application component
│       └── main.jsx         # Entry point
└── server                   # Backend Express application
    ├── models               # Mongoose models (User, Profile, Business)
    ├── routes               # Express routes (auth, profile, business, investments)
    ├── middleware           # Middleware (auth.js for JWT)
    ├── uploads              # Uploaded files (profile images)
    └── index.js             # Server entry point
API Endpoints

Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in a user and return a JWT token.
User Profile
PUT /api/users/update: Update user profile information, including image upload.
Business Listings
GET /api/businesses: Fetch all business projects.
GET /api/businesses/
: Fetch details for a specific business.
Investments
POST /api/investments: Submit an investment for a specific business project.
Notes

File Uploads: Images are stored locally in the uploads folder.
Security: Ensure the JWT secret in the .env file is secure, as it is critical for authentication.
Future Improvements

Implement more robust error handling and input validation.
Add user roles for business owners to create projects directly.
Integrate cloud storage for file uploads.
License

This project is open-source.