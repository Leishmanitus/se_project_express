# What To Wear Project

This project aims to provide users with clothing recommendations based on the current weather. The application allows users to sign up, sign in, add new custom clothing items, like and unlike items, and update their user information. Additionally, users can change the temperature display from Fahrenheit to Celsius and log out of their accounts. The project is built using the MERN stack and is deployed using Google Cloud Services.

## Front-End Functionality

### Weather Integration
- Fetches data from a weather API to retrieve current weather conditions.
- Displays weather information to users, including temperature and weather description.

### Clothing Recommendations
- Suggests appropriate clothing items based on the current temperature.
- Allows users to view recommended clothing items for different weather conditions.

### Custom API Integration
- Interacts with a custom API to handle back-end operations, such as fetching clothing data and user authentication.

### User Authentication
- Enables users to sign up and sign in securely.
- Provides options for users to update their profile information.

### Clothing Management
- Allows users to add new custom clothing items to their profile.
- Supports liking and unliking clothing items to personalize recommendations.

### Temperature Display
- Allows users to toggle between Fahrenheit and Celsius for temperature display.

### User Session Management
- Enables users to log out securely to end their session.

## Back-End Functionality

### Database Operations
- Pushes requests to the database to store and retrieve user data, clothing items, and other relevant information.

### Authorization with JWT
- Authorizes user actions using JSON Web Tokens (JWT) to ensure secure access to protected routes.

### Route Definition
- Defines routes for each HTTP request to handle various user interactions and data operations.

### Model Objects
- Defines model objects for forms and data entities to ensure structured data storage.

### Controller Logic
- Implements controllers to handle incoming requests, validate data, and execute appropriate actions.
- Utilizes defensive coding practices to handle errors and ensure smooth operation.

## Technology Stack
- **MongoDB**: A NoSQL database used for storing user data and clothing information.
- **Express.js**: A web application framework for Node.js used to build the back-end API.
- **React.js**: A JavaScript library for building user interfaces used to develop the front-end components.
- **Node.js**: A JavaScript runtime environment used to execute server-side code.
- **JSON Web Tokens (JWT)**: Used for user authentication and authorization.
- **Jest**: For unit testing the application.
- **Joi**: For schema validation and data validation.
- **Winston**: For logging errors and other significant events.
- **Google Cloud Services**: For deploying and hosting the application.

## Getting Started
To run the project locally, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` in both the client and server directories.
4. Configure environment variables for MongoDB connection, API keys, and other sensitive data.
5. Start the development server by running `npm start` in both the client and server directories.

## Contributors
- [Tyler Leishman](https://github.com/Leishmanitus) - Project Lead & Developer

## Links
- Link to the Front-End repo: (https://github.com/Leishmanitus/se_project_react.git)
- Link to the Back-End repo: (https://github.com/Leishmanitus/se_project_express.git)
- Link to the site: (https://www.alphazoo.crabdance.com)
- Link to api: (https://api.alphazoo.crabdance.com)

