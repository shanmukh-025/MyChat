#!/bin/bash

# MyChat API Testing Script
# This script contains curl examples for testing all API endpoints

BASE_URL="http://localhost:3000/api"
JWT_TOKEN="your_jwt_token_here"

echo "=== MyChat API Testing ==="
echo ""

# ==================== AUTH ENDPOINTS ====================
echo "=== AUTH ENDPOINTS ==="
echo ""

# Signup
echo "1. Signup - POST /auth/signup"
echo "curl -X POST $BASE_URL/auth/signup \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{
    \"fullName\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"password\": \"password123\"
  }'"
echo ""

# Login
echo "2. Login - POST /auth/login"
echo "curl -X POST $BASE_URL/auth/login \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{
    \"email\": \"john@example.com\",
    \"password\": \"password123\"
  }'"
echo ""

# Check Auth
echo "3. Check Authentication - GET /auth/check"
echo "curl -X GET $BASE_URL/auth/check \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Get Profile
echo "4. Get User Profile - GET /auth/profile"
echo "curl -X GET $BASE_URL/auth/profile \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Get All Users
echo "5. Get All Users - GET /auth/users"
echo "curl -X GET $BASE_URL/auth/users \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Search Users
echo "6. Search Users - GET /auth/users/search?query=john"
echo "curl -X GET '$BASE_URL/auth/users/search?query=john' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Update Profile Picture
echo "7. Update Profile Picture - PUT /auth/update-profile"
echo "curl -X PUT $BASE_URL/auth/update-profile \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN' \\"
echo "  -d '{
    \"profilePic\": \"data:image/jpeg;base64,...\"
  }'"
echo ""

# Update User Profile
echo "8. Update User Profile - PUT /auth/profile"
echo "curl -X PUT $BASE_URL/auth/profile \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN' \\"
echo "  -d '{
    \"fullName\": \"Jane Doe\",
    \"email\": \"jane@example.com\"
  }'"
echo ""

# Delete Account
echo "9. Delete Account - DELETE /auth/account"
echo "curl -X DELETE $BASE_URL/auth/account \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Logout
echo "10. Logout - POST /auth/logout"
echo "curl -X POST $BASE_URL/auth/logout"
echo ""

# ==================== MESSAGE ENDPOINTS ====================
echo "=== MESSAGE ENDPOINTS ==="
echo ""

# Get All Contacts
echo "11. Get All Contacts - GET /messages/contacts"
echo "curl -X GET $BASE_URL/messages/contacts \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Get Chat Partners
echo "12. Get Chat Partners - GET /messages/chats"
echo "curl -X GET $BASE_URL/messages/chats \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Get Conversation Stats
echo "13. Get Conversation Stats - GET /messages/stats"
echo "curl -X GET $BASE_URL/messages/stats \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Get Messages by User ID
echo "14. Get Messages with User - GET /messages/:userId"
echo "curl -X GET $BASE_URL/messages/USER_ID_HERE \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Search Messages
echo "15. Search Messages - GET /messages/search?query=hello"
echo "curl -X GET '$BASE_URL/messages/search?query=hello' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# Send Message
echo "16. Send Message - POST /messages/send/:userId"
echo "curl -X POST $BASE_URL/messages/send/USER_ID_HERE \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN' \\"
echo "  -d '{
    \"text\": \"Hello, how are you?\",
    \"image\": null
  }'"
echo ""

# Edit Message
echo "17. Edit Message - PUT /messages/:messageId"
echo "curl -X PUT $BASE_URL/messages/MESSAGE_ID_HERE \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN' \\"
echo "  -d '{
    \"text\": \"Updated message\"
  }'"
echo ""

# Delete Message
echo "18. Delete Message - DELETE /messages/:messageId"
echo "curl -X DELETE $BASE_URL/messages/MESSAGE_ID_HERE \\"
echo "  -H 'Authorization: Bearer $JWT_TOKEN'"
echo ""

# ==================== OTHER ENDPOINTS ====================
echo "=== OTHER ENDPOINTS ==="
echo ""

# Health Check
echo "19. Health Check - GET /health"
echo "curl -X GET $BASE_URL/health"
echo ""

# API Documentation
echo "20. API Documentation - GET /docs"
echo "curl -X GET $BASE_URL/docs"
echo ""

echo "=== End of API Testing Guide ==="
