# Social Media Back-End Server 

Welcome to the Social Media Node-Mongo-Express App! This application is a basic social media platform built using Node.js, Express.js, and MongoDB. 

# Features 🧩
Users can update their profiles, retrieve individual user details, and seamlessly follow or unfollow other users. The authentication system allows secure login and registration. Additionally, post management features enable users to create, update, delete, like, and retrieve posts

## Users
- **Update User**: Users can modify their profile information.
- **Get a Single User**: Retrieve detailed information about a specific user.
- **Follow and Unfollow User:** Users can establish or terminate connections with other users.

| Route | HTTP Method | Description | Status Code |
|-------|-------------|-------------|-------------|
| `/` | `GET` | Display a welcome message for the user route. | `200` (Success) |
| `/:id` | `GET` | Retrieve detailed information about a specific user. | `200` (Success), `500` (Internal Server Error) |
| `/:id` | `PUT` | Update user details. Requires user authentication or admin privileges. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |
| `/:id` | `DELETE` | Delete user account. Requires user authentication or admin privileges. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |
| `/:id/follow` | `PUT` | Follow a user. Requires user authentication. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |
| `/:id/unfollow` | `PUT` | Unfollow a user. Requires user authentication. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |



## Authentication

- Login: Securely log in to your account with proper authentication.
- Register: Create a new account with a hassle-free registration process.

| Route | HTTP Method | Description | Status Code |
|-------|-------------|-------------|-------------|
| `/register` | `POST` | User registration route. Creates a new user with a hashed password. | `200` (Success), `500` (Internal Server Error) |
| `/login` | `POST` | User login route. Validates user credentials and returns user information. | `200` (Success), `404` (User Not Found), `400` (Wrong Password), `500` (Internal Server Error) |

## Posts
- Create Post: Users can share their thoughts and content with the community.
- Update Post: Modify the content of a previously shared post.
- Delete Post: Remove a post from the user's profile.
- Like Post: Users can express appreciation for a post.
- Get Post: Retrieve detailed information about a specific post.
- Get All Posts on User's Timeline: View a consolidated feed of posts from users the current user follows.

  
| Route | HTTP Method | Description | Status Code |
|-------|-------------|-------------|-------------|
| `/` | `POST` | Create a new post. | `200` (Success), `500` (Internal Server Error) |
| `/:id` | `PUT` | Update a post. Requires post ownership. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |
| `/:id` | `DELETE` | Delete a post. Requires post ownership. | `200` (Success), `403` (Forbidden), `500` (Internal Server Error) |
| `/:id/like` | `PUT` | Like or dislike a post. | `200` (Success), `500` (Internal Server Error) |
| `/:id` | `GET` | Retrieve detailed information about a specific post. | `200` (Success), `500` (Internal Server Error) |
| `/timeline/all` | `GET` | Retrieve posts from the user's timeline. | `200` (Success), `500` (Internal Server Error) |
