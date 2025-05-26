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

## Installation Guide

**Cloning the project**
`git clone https://github.com/01prakash-aditya/online-judge`

**Backend**
`npm run dev`

**Frontend**
`cd client`
`npm run dev`

**Compiler and AI code reviewer**
`cd backend`
`npx nodemon index.js`

--

## Future Enhancements

- **Plagiarism Detection** (e.g., MOSS integration)
- **Real-Time Leaderboard** using WebSockets
- **Timer-Based Contests**
- **Multi-Language Support** using language-specific Docker images

---
