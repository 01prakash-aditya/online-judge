# AlgoU Online Judge

**AlgoU** is an **Online Judge platform** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It supports coding problems with automatic code evaluation, problem management, AI review and leaderboard functionality.

---

## Overview

**AlgoU** enables:

- **User Registration and Login** with JWT-based authentication
- **Problem Listing** with filtering options
- **Code Submission** with real-time verdict feedback
- **Leaderboard Tracking** based on user performance
- **User Profiles** displaying past submissions

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Code Evaluation**: Docker containers 

---

## System Workflow

1. **User submits code** through the platform
2. **Worker service** runs the code inside a **Docker container**.
3. Output is **compared with expected results** stored in the database.
4. **Verdict** is stored and shown on the frontend.

---

## Security Measures

- **Docker sandboxing** for safe and isolated execution
- **JWT Authentication**
- **Input validation** and escaping to prevent injection attacks

---

## Installation and Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **C++ compiler, Python3, Java jdk24** installed on your system

---

### Compiler & AI review Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with the following variables:

    ```env
    PORT=8000
    GOOGLE_API_KEY=your_google_api_key
    ```

4. Start the server:

    ```bash
    npx nodemon index.js
    ```

---

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and go to:  
   [http://localhost:5173](http://localhost:5173) *(or the port shown in your terminal)*

---

### Backend Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

---

## 📡 API Endpoints

- `GET /` – Health check endpoint  
- `POST /run` – Execute code with input  
  **Body:**
  ```json
  {
    "language": "cpp",
    "code": "string",
    "input": "string"
  }
  ```

- `POST /ai-review` – Get AI feedback on code  
  **Body:**
  ```json
  {
    "code": "string"
  }
  ```

---

## 🐳 Docker Support

The backend includes Docker configuration for containerized deployment.

1. **Build the Docker image:**

    ```bash
    docker-compose up --build
    ```

2. **Run on PORT:**

    ```bash
    (http://localhost:5173)
    ```
3. **To stop the containers:**

   ```bash
   docker-compose down
   ```

--

## Future Enhancements

- **Plagiarism Detection** (e.g., MOSS integration)
- **Real-Time Leaderboard** using WebSockets
- **Timer-Based Contests**
- **Multi-Language Support** using language-specific Docker images

---
