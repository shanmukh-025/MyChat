# MyChat Backend - Complete Setup Guide

## Overview
This is the Node.js/Express backend for the MyChat chat application. It provides RESTful APIs for user authentication, messaging, and real-time communication.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **File Storage**: Cloudinary
- **Email**: Resend
- **Security**: Arcjet rate limiting & protection

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)
- Resend account (for emails)

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/mychat
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mychat

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=MyChat

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Make sure MongoDB is running
mongod

# The app will automatically create collections when needed
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGO_URI` in `.env`

### 4. Run the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

### Available Endpoints

#### Authentication (`/api/auth`)
- `POST /signup` - Create new account
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /check` - Verify authentication
- `GET /profile` - Get user profile
- `GET /users` - Get all users
- `GET /users/search?query=` - Search users
- `PUT /update-profile` - Update profile picture
- `PUT /profile` - Update user info
- `DELETE /account` - Delete account

#### Messages (`/api/messages`)
- `GET /contacts` - Get all users (except self)
- `GET /chats` - Get chat partners
- `GET /stats` - Get conversation statistics
- `GET /:id` - Get messages with specific user
- `GET /search?query=` - Search messages
- `POST /send/:id` - Send message to user
- `PUT /:messageId` - Edit message
- `DELETE /:messageId` - Delete message

#### Utility
- `GET /api/health` - Health check
- `GET /api/docs` - API documentation

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  profilePic: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  text: String (max 2000 chars),
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

## Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Rate limiting with Arcjet
- ✅ CORS protection
- ✅ Cookie-based JWT tokens

### Messaging
- ✅ Real-time messaging with Socket.io
- ✅ Text and image messages
- ✅ Message editing and deletion
- ✅ Message search functionality
- ✅ Conversation statistics

### User Management
- ✅ User registration and login
- ✅ Profile picture upload to Cloudinary
- ✅ User search functionality
- ✅ Account deletion
- ✅ Welcome emails via Resend

## Testing the API

### Using curl
See `API_TESTING.sh` for comprehensive curl examples.

Example:
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Using Postman
1. Import the `POSTMAN_COLLECTION.json` file
2. Set up environment variables
3. Test all endpoints

### Using the Frontend
Simply run the frontend and it will connect to the backend automatically.

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

Common error codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Deployment

### To Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_production_mongo_uri
heroku config:set JWT_SECRET=your_production_secret
# ... set other variables

# Deploy
git push heroku main
```

### To Other Platforms
1. Build: `npm install` (dependencies)
2. Set environment variables on your platform
3. Start command: `npm start`
4. Ensure MongoDB is accessible

## Troubleshooting

### MongoDB Connection Issues
- Check MONGO_URI is correct
- Ensure MongoDB is running (local) or accessible (Atlas)
- Check firewall rules for MongoDB

### JWT Token Errors
- Token might be expired - user needs to login again
- Check JWT_SECRET matches in all environments
- Ensure cookies are enabled on client

### CORS Errors
- Check CLIENT_URL in .env matches frontend URL
- Ensure credentials: true is set in frontend requests

### Rate Limiting Issues
- Arcjet rate limits are active - wait before retrying
- Check Arcjet configuration in .env

## File Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── models/           # Database schemas
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/           # API endpoints
│   │   ├── auth.route.js
│   │   └── message.route.js
│   ├── middleware/       # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   └── arcjet.middleware.js
│   ├── lib/              # Utilities & configurations
│   │   ├── db.js
│   │   ├── env.js
│   │   ├── utils.js
│   │   ├── socket.js
│   │   ├── cloudinary.js
│   │   ├── resend.js
│   │   ├── apiResponse.js
│   │   └── dbInit.js
│   ├── emails/           # Email templates
│   └── server.js         # Main server file
├── .env                  # Environment variables
├── .env.example         # Example env file
└── package.json         # Dependencies
```

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
