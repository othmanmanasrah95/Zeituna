# Zeituna ImpRed Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Authentication Flow](#authentication-flow)
8. [Setup and Installation](#setup-and-installation)

## Project Overview

Zeituna ImpRed is a comprehensive platform for managing olive trees, products, and transactions. The system allows users to register, manage their olive trees, purchase products, and track their token balances.

### Key Features

- User authentication and profile management
- Olive tree adoption and management
- Sustainable product marketplace
- TUT Token reward system
- Admin dashboard for system management
- Tree adoption program with NFT certificates

## System Architecture

The project follows a modern full-stack architecture:

### Backend

- Node.js with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication
- RESTful API design
- Role-based access control

### Frontend

- React 18 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Framer Motion for animations
- React Router DOM for routing
- Context API for state management
- Axios for API communication

## Backend Documentation

### Directory Structure

```
backend/
├── config/
│   └── db.ts         # Database configuration
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── treeController.js
│   ├── adminController.js
│   └── transactionController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Tree.js
│   ├── Transaction.js
│   └── TokenBalance.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── treeRoutes.js
│   └── adminRoutes.js
├── middleware/
│   └── auth.js
└── server.js
```

### Key Components

#### Authentication System

- JWT-based authentication with 30-day token expiration
- Role-based access control (Admin/Farmer/User)
- Password hashing with bcrypt
- Protected routes middleware

#### Database Models

1. **User Model**

   - Basic user information (name, email)
   - Password (hashed)
   - Role (user, admin, farmer)
   - Adopted trees reference
   - Orders reference

2. **Tree Model**

   - Tree identification
   - Location tracking
   - Status management
   - Farmer association
   - Adoption price
   - Adopters list

3. **Product Model**

   - Product details
   - Pricing
   - Category
   - Seller reference
   - Reviews system
   - Featured status

4. **Transaction Model**

   - Transaction tracking
   - User association
   - Items list
   - Status management
   - Payment details

5. **TokenBalance Model**
   - User reference
   - Balance tracking
   - Transaction history

## Frontend Documentation

### Directory Structure

```
Client/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── trees/
│   │   └── common/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   └── treeService.ts
│   ├── config/
│   │   └── api.ts
│   └── App.tsx
```

### Key Components

#### Authentication Context

- Global authentication state management
- User session handling
- Protected route implementation
- Token management

#### Cart Context

- Shopping cart state management
- Add/remove items
- Update quantities
- Cart persistence
- Total calculation

#### API Services

1. **AuthService**

   - User registration
   - Login/logout
   - Profile management
   - Token handling

2. **ProductService**

   - Product listing with filters
   - Product details
   - Review management
   - Purchase processing

3. **TreeService**
   - Tree listing
   - Tree adoption
   - Status updates
   - Location tracking

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register

- Register new user
- Required fields: name, email, password
- Returns: User object and token
- Creates initial token balance

#### POST /api/auth/login

- User login
- Required fields: email, password
- Returns: User object and token

#### GET /api/auth/profile

- Get user profile
- Requires authentication
- Returns: User object with adopted trees and orders

#### PUT /api/auth/profile

- Update user profile
- Requires authentication
- Fields: name, email, password

### Product Endpoints

#### GET /api/products

- List all products
- Query parameters:
  - category: Filter by category
  - featured: Filter featured products
  - sort: Sort by price, rating, or date
- Returns: Array of products

#### GET /api/products/:id

- Get product details
- Returns: Product object with reviews

#### POST /api/products

- Create new product
- Requires authentication (seller/admin)
- Required fields: name, price, description, category

#### PUT /api/products/:id

- Update product
- Requires authentication (seller/admin)
- Returns: Updated product

#### DELETE /api/products/:id

- Delete product
- Requires authentication (seller/admin)

#### POST /api/products/:id/reviews

- Add product review
- Requires authentication
- Required fields: rating, comment

### Tree Endpoints

#### GET /api/trees

- List all trees
- Query parameters:
  - status: Filter by status
  - sort: Sort by price or date
- Returns: Array of trees

#### GET /api/trees/:id

- Get tree details
- Returns: Tree object with farmer and adopters

#### POST /api/trees

- Create new tree
- Requires authentication (farmer/admin)
- Required fields: location, status, adoptionPrice

#### PUT /api/trees/:id

- Update tree
- Requires authentication (farmer/admin)
- Returns: Updated tree

#### POST /api/trees/:id/adopt

- Adopt a tree
- Requires authentication
- Creates transaction and updates token balance

### Admin Endpoints

#### GET /api/admin/overview

- Get dashboard overview
- Requires authentication (admin)
- Returns: Statistics and recent activities

#### GET /api/admin/users

- List all users
- Requires authentication (admin)
- Returns: Array of users with details

#### PUT /api/admin/users/:id/role

- Update user role
- Requires authentication (admin)
- Required fields: role

#### GET /api/admin/products

- List all products with details
- Requires authentication (admin)

#### GET /api/admin/trees

- List all trees with details
- Requires authentication (admin)

#### GET /api/admin/transactions

- List all transactions
- Requires authentication (admin)

#### GET /api/admin/token-balances

- List all token balances
- Requires authentication (admin)

## Database Schema

### User Collection

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  adoptedTrees: [ObjectId],
  orders: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Tree Collection

```javascript
{
  location: String,
  status: String,
  adoptionPrice: Number,
  farmer: ObjectId,
  adopters: [ObjectId],
  plantedDate: Date,
  lastHarvestDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection

```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  seller: ObjectId,
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String
  }],
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Collection

```javascript
{
  user: ObjectId,
  type: String,
  items: [{
    item: ObjectId,
    quantity: Number,
    price: Number
  }],
  status: String,
  totalAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### TokenBalance Collection

```javascript
{
  user: ObjectId,
  balance: Number,
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

1. **Registration**

   - User submits registration form
   - Backend validates data
   - Password is hashed with bcrypt
   - User is created
   - Initial token balance is created
   - JWT token is generated
   - Token is returned to client

2. **Login**

   - User submits login form
   - Backend validates credentials
   - JWT token is generated
   - Token is stored in localStorage
   - User is redirected to dashboard

3. **Protected Routes**
   - Token is checked on each request
   - Unauthorized requests are redirected to login
   - Role-based access control is enforced
   - Token is refreshed when needed

## Setup and Installation

### Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   cd Client
   npm install
   ```

2. Configure API endpoint:

   ```typescript
   // src/config/api.ts
   export const API_URL = "http://localhost:5000/api";
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

1. Ensure MongoDB is installed and running
2. Create database and collections
3. Set up indexes for optimal performance

## Security Considerations

1. **Authentication**

   - JWT tokens with 30-day expiration
   - Password hashing with bcrypt
   - Role-based access control
   - Protected routes middleware

2. **Data Protection**

   - Input validation
   - XSS protection
   - CORS configuration
   - Rate limiting

3. **Error Handling**
   - Centralized error handling
   - Proper error messages
   - Logging system

## Best Practices

1. **Code Organization**

   - Modular architecture
   - Separation of concerns
   - Consistent naming conventions
   - TypeScript for type safety

2. **API Design**

   - RESTful principles
   - Proper HTTP methods
   - Consistent response format
   - Query parameter support

3. **Error Handling**

   - Try-catch blocks
   - Proper error messages
   - Error logging
   - Client-friendly error responses

4. **Security**
   - Input validation
   - Authentication checks
   - Data sanitization
   - Role-based access control

## Future Improvements

1. **Features**

   - Real-time updates with WebSocket
   - Advanced analytics dashboard
   - Mobile application
   - Payment gateway integration
   - Email notifications

2. **Technical**

   - Caching implementation
   - Performance optimization
   - Automated testing
   - CI/CD pipeline
   - API documentation with Swagger

3. **Security**
   - Two-factor authentication
   - Advanced encryption
   - Security audits
   - Rate limiting
   - API key management
