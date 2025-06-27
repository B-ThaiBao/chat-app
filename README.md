# 🌐 Chat App

A real-time chat application built with **Node.js**, **Express**, **Socket.IO**, **React.js**, **Tailwind CSS**, and **DaisyUI**. Users can chat with **text or images**, and switch between **32 modern UI themes**. Image uploads are stored on **Cloudinary**, and data is persisted with **MongoDB**.

### 🚀 Live Demo
🔗 [Try the app here](https://chat-app-f2s1.onrender.com)

### 📺 Preview Video
[![Watch the video](https://img.youtube.com/vi/C_ozawCWuGw/maxresdefault.jpg)](https://youtu.be/C_ozawCWuGw)

▶️ [Watch this video on YouTube](https://youtu.be/C_ozawCWuGw)


## ✨ Features

- 🔥 Real-time chat with Socket.IO
- 🖼️ Send and receive text or image messages
- 🎨 Choose from **32 DaisyUI themes**
- 🌤️ Responsive UI using Tailwind CSS
- ☁️ Image upload & storage via Cloudinary
- 🧠 Backend API with Node.js + Express
- 💾 MongoDB for persistent storage


## 🛠️ Tech Stack

### 🔧 Frontend
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

### 🔩 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) (for image storage)

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/B-ThaiBao/chat-app.git
cd chat-app
```

### 2. Setup environment variables

Create ```.env``` files in ```backend/``` directories as needed.
Example ```.env``` for server:
```ini
MONGODB_URI=... (taken from mongo atlas)
JWT_SECRET=... (random)
PORT=5002
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=... (taken from cloudinary)
CLOUDINARY_API_KEY=... (taken from cloudinary)
CLOUDINARY_API_SECRET=... (taken from cloudinary)
```

### 3. Install dependencies

Backend (```backend/```):
```bash
cd backend
npm install
```
Frontend (```frontend/```):
```bash
cd frontend
npm install
```

### 4. Run the app locally

Backend (```backend/```):
```bash
cd backend
npm run dev
```
Frontend (```frontend/```):
```bash
cd frontend
npm run dev
```
Open http://localhost:5173 in your browser.

## 🙌 Acknowledgements
Special thanks to the developers of [DaisyUI](https://daisyui.com/) and [Socket.IO](https://socket.io/) for enabling this project.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧑‍💻 Author
👤 Thai Bao (GitHub: [@B-ThaiBao](https://github.com/B-ThaiBao))
