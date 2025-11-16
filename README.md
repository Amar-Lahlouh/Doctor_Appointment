# Doctor Appointment Backend

This project is a **Node.js + Express** backend for a Doctor Appointment system. It includes authentication, appointment management, image uploads, Stripe payments, and more.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Doctor Profile Management
* Book & Manage Appointments
* Upload Profile Images (ImageKit )
* Secure Password Hashing with **bcryptjs**
* Payment Integration using **Stripe**
* MongoDB Database with **Mongoose**
* CORS enabled for frontend communication
* Environment variables using **dotenv**

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB & Mongoose**
* **JWT** for authentication
* **ImageKit** for media storage
* **Stripe** for payments

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Amar-Lahlouh/Doctor_Appointment.git
```

2. Navigate to the project folder:

```bash
cd Doctor_Appointment
```

3. Install all dependencies:

```bash
npm install
```

4. Create a `.env` file and add your environment variables:

```env
PORT=5000
MONGO_URI=your-mongo-url
JWT_SECRET=your-secret
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_ENDPOINT=your-url-endpoint
STRIPE_SECRET_KEY=your-stripe-secret
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run start-dev
```

### Production Mode

```bash
npm start
```

The server will start at:

```
http://localhost:5000/
```

---

## 📁 Project Structure

```
📦 Doctor_Appointment
 ┣ 📂 controllers
 ┣ 📂 middleware
 ┣ 📂 models
 ┣ 📂 routes
 ┣ index.js
 ┣ package.json
 ┗ .env
```

---

## 🖥️ Frontend Setup

If this project includes a frontend (React), follow these steps:

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

Make sure your backend is running for full functionality.

---

## 🤝 Contributing

Feel free to fork the project and submit pull requests.

---

## 🖼️ Project Screenshot

<img width="1758" height="690" alt="Image" src="https://github.com/user-attachments/assets/ee5cd8c2-14fa-4ba6-9053-8e4f41bcd501" />

<img width="605" height="666" alt="Image" src="https://github.com/user-attachments/assets/0a232af1-fcb4-4343-a5f0-735e625702d4" />

<img width="634" height="716" alt="Image" src="https://github.com/user-attachments/assets/4aadc30a-c615-436a-81e6-8e91e78def7c" />
---

## 👨‍💻 Author

**Amar Lahlouh**

---
