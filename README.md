# Authentication System (MERN Stack)

A complete authentication system built using the **MERN stack**, supporting:

- User Signup
- Password Hashing with **bcryptjs**
- User Login
- JWT Token Generation & Authentication
- Secure API Endpoints
- Fully responsive UI with React
- Backend hosted on **Render**
- Frontend hosted on **Vercel**

---

## 🚀 Live Demo

**Frontend:** [https://login-signup-page-pi-lake.vercel.app/]

**Backend API:** [https://backend-5rvt.onrender.com]

---

## 🛠 Features

- Signup with hashed passwords
- Login with JWT token generation
- Secure authentication flow
- LocalStorage token storage
- API requests handled with Axios
- MongoDB database

---

## 🧑‍💻 Tech Stack

### **Frontend:**

- React JS
- Axios
- CSS
- React Router

### **Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (Password Hashing)
- jsonwebtoken (JWT Token)
- CORS

---

## 📦 API Endpoints

### **POST /api/user/signup**

Registers a new user.

### **POST /api/user/login**

Authenticates user and returns JWT token.

---

## ⚙️ Installation Guide

### **Backend Setup**

```bash
cd backend
npm install
npm start
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm start
```

---

## 📂 Folder Structure

```
/authentication
   /frontend
   /backend
      server.js
      /routes
      /models
      /config.js
```

---

## 🔐 Environment Variables

Configure the following in your `.env` files:

### Backend `.env`

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### Frontend `.env`

```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 📝 Author

**Srikanth B**

GitHub: [https://github.com/Sri2413](https://github.com/Sri2413)
