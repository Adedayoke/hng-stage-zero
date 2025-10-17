# HNG13 Backend - Stage 0: Dynamic Profile Endpoint

A simple RESTful API built with Node.js and Express that returns profile information along with dynamic cat facts fetched from an external API.

## 🚀 Features

- RESTful API endpoint returning JSON data
- Dynamic cat facts integration from Cat Facts API
- ISO 8601 timestamp formatting
- Graceful error handling with fallback responses
- Environment variable configuration
- Timeout handling for external API calls

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stage-0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit the `.env` file with your preferred values:
   ```
   PORT=3000
   NODE_ENV=development
   ```

## 📦 Dependencies

This project uses the following dependencies:

- **express** (^5.1.0) - Fast, unopinionated web framework for Node.js
- **axios** (^1.12.2) - Promise-based HTTP client for API requests
- **dotenv** (^3.0.0) - Loads environment variables from .env file
- **nodemon** (^3.1.10) - Development tool for auto-restarting the server (dev dependency)

To install all dependencies, run:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📡 API Endpoints

### GET `/me`

Returns profile information with a dynamic cat fact.

**Response Format:**
```json
{
  "status": "success",
  "user": {
    "email": "adedayoke2006@gmail.com",
    "name": "Oke Habeeb Adedayo",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-17T12:34:56.789Z",
  "fact": "Cats have five toes on their front paws, but only four toes on their back paws."
}
```

**Success Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json

**Error Handling:**
- If the Cat Facts API is unavailable, a fallback cat fact is returned
- If an unexpected error occurs, a 500 status code is returned with error details

## 🧪 Testing the Endpoint

You can test the endpoint using any of these methods:

### Using cURL
```bash
curl http://localhost:3000/me
```

### Using Browser
Simply navigate to:
```
http://localhost:3000/me
```

### Using Postman/Thunder Client
- Method: GET
- URL: `http://localhost:3000/me`

## 🌐 Deployment

This application can be deployed to various platforms:

- **Railway** - [Railway Deployment Guide](https://docs.railway.app/)
- **Heroku** - [Heroku Deployment Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- **AWS** - [AWS Elastic Beanstalk Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.html)

**Note:** Make sure to set environment variables on your deployment platform.

## 📁 Project Structure

```
stage-0/
├── src/
│   └── index.js          # Main application file
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port number for the server | 3000 |
| `NODE_ENV` | Environment mode (development/production) | development |

## 🤝 Contributing

This is a stage 0 task for HNG13 Internship.

## 👤 Author

**Oke Habeeb Adedayo**
- Email: adedayoke2006@gmail.com
- Stack: Node.js/Express

## 📝 License

ISC

## 🙏 Acknowledgments

- [HNG Internship](https://hng.tech/) for the opportunity
- [Cat Facts API](https://catfact.ninja/) for providing the cat facts

---

**Built with ❤️ for HNG13 Backend Track**
