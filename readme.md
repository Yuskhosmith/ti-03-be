# User and Role Management API
This is a Node.js API for managing users, roles, permissions, and groups. It allows admins to create users, assign roles, permissions, and manage group memberships. It also supports user authentication and authorization using JWT tokens.

## Getting Started
### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)
- A package manager like npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Yuskhosmith/ti-03-be.git
    cd ti-03-be
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Environment Setup: Create a .env file in the root directory and configure the following variables:
    ```bash
    MONGO_URI=mongodb://localhost:27017/your_database_name
    JWT_SECRET=your_secret_key
    ```
    - MONGO_URI: MongoDB connection string.
    - JWT_SECRET: A secret key for signing JWT tokens.

### Seeding Default Roles and Permissions
To seed the database with default roles and permissions, run:
```bash
npm run seed
```
This script will create initial roles and permissions required for the application.

### Creating an Admin
To create an admin, check the file `src/util/createAdmin.js` and modify the credentials as you want, then run:
```bash
npm run create-admin
```

### Running the Application
Start the server with:
```bash
npm run dev
```
The API will be available at `http://localhost:3000`.

## Endpoints
1. User Registration
    - POST /api/auth/register
    - **Description:** Registers a new user.
    - **Request Body:**
        ```json
        {
            "username": "newuser",
            "email": "user@example.com",
            "password": "password123"
        }
        ```
    - **Response:**
        - 201: User successfully registered.
        - 400: User already exists.
        - 500: Server error.
2. User Login
    - POST /api/auth/login
    - **Description:** Authenticates the user and returns a JWT token.
    - **Request Body:**
        ```json
        {
            "email": "user@example.com",
            "password": "password123"
        }
        ```
    - **Response:**
        - 200: Login successful. Returns the JWT token.
        - 400: Invalid credentials.
        - 500: Server error.

3. Get User Details
    - GET /api/users/me
    - **Description:** Fetches details of an authenticated user with their token (including roles and permissions).
    - **Authorization:** Requires JWT token in the Authorization header.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Response:**
        - 200: User details fetched successfully, including roles and permissions.
        - 404: User not found.
        - 500: Server error.

4. Admin Protected Route
    - GET /api/protected/admin
    - **Description:** A protected route that only allows Admin users to access it.
    - **Authorization:** Requires JWT token in the Authorization header.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Response:**
        - 200: Welcome message for the admin.
        - 401: Unauthorized access.
        - 403: Forbidden (if the user does not have the Admin role).
        - 500: Server error.

5. Assign Role to User
    - POST /api/protected/assign-role
    - **Description:** Assign a role to a user.
    - **Authorization:** Requires JWT token with the Admin role.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Request Body:**
        ```json
        {
            "userId": "1234567",
            "roleId": "9876543"
        }
        ```
    - **Response:**
        - 200: Role assigned successfully.
        - 403: Forbidden (if the user does not have the Admin role).
        - 404: Role or user not found.
        - 500: Server error.

6. Assign Permission to Role
    - POST /api/protected/assign-permission
    - **Description:** Assign a permission to a role.
    - **Authorization:** Requires JWT token with the Admin role.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Request Body:**
        ```json
        {
            "roleId": "1234567",
            "permissionId": "9876543"
        }
        ```
    - **Response:**
        - 200: Permission assigned successfully.
        - 403: Forbidden (if the user does not have the Admin role).
        - 404: Role or Permission not found.
        - 500: Server error.

7. Create Group
    - POST /api/protected/group
    - **Description:** Create a new group with permissions.
    - **Authorization:** Requires JWT token with the Admin role.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Request Body:**
        ```json
        {
            "name": "Editor",
            "description": "Optional Description",
            "permissions": ["permissionId1", "permissionId2"]
        }
        ```
    - **Response:**
        - 201: Group created successfully.
        - 400: Invalid data or permissions.
        - 403: Forbidden (if the user does not have the Admin role).
        - 404: Permission not found.
        - 500: Server error.

8. Assign User to Group
    - POST /api/protected/assign-group
    - **Description:** Add a user to a specific group.
    - **Authorization:** Requires JWT token with the Admin role.
    - **Request Header:**
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - **Request Body:**
        ```json
        {   
            "userId": "1234567",
            "groupId": "9876543"
        }
        ```
    - **Response:**
        - 200: User added to the group successfully.
        - 403: Forbidden (if the user does not have the Admin role).
        - 404: User or Group not found.
        - 500: Server error.