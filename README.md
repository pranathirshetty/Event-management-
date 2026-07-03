# 🎓 College Event Management System

A web-based platform that simplifies the management of college events by enabling students to register online and allowing administrators to efficiently manage events and attendance.

🌐 **Live Demo:** https://event-management-eight-lime.vercel.app

---

## 📖 Overview

The College Event Management System is a full-stack web application built using **React**, **Tailwind CSS**, and **Firebase**. It streamlines the entire event management process—from event registration to attendance tracking—through a secure, serverless architecture.

Students can browse and register for upcoming events, receive a confirmation email with a unique QR code, and mark their attendance by having their QR code scanned by an administrator during the event.

---

## 🎯 Features

### 👤 Role-Based Authentication

* Secure login using Firebase Authentication.
* Separate access for **Admin** and **Student** users.

### 📅 Event Registration

* Browse available college events.
* Register for events with a single click.
* Prevent duplicate registrations.

### 📧 Email Confirmation

* Automatic confirmation email after successful registration.
* Includes event details and a unique QR code for attendance.

### 📱 QR Code Attendance

* Generates a unique QR code for every registered participant.
* Admin scans the QR code during the event.
* Attendance is automatically recorded in Firestore.

### 🛠️ Admin Dashboard

* Create, edit, and delete events.
* View registered participants.
* Scan QR codes to mark attendance.
* Manage event information efficiently.

---

## 🛠️ Technology Stack

| Category       | Technology              |
| -------------- | ----------------------- |
| Frontend       | React.js                |
| Styling        | Tailwind CSS            |
| Backend        | Firebase (Serverless)   |
| Database       | Cloud Firestore         |
| Authentication | Firebase Authentication |
| Hosting        | Vercel                  |

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/event-management.git

# Navigate to the project directory
cd event-management

# Install dependencies
npm install

# Start the development server
npm start
```

---

## 🔥 Firebase Configuration

Create a Firebase project and add your Firebase configuration before running the application.

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🚀 Future Enhancements

* Event search and filtering
* Event categories
* Participant feedback and ratings
* Analytics dashboard
* Real-time notifications
* Certificate generation for attendees

---

## 📌 Conclusion

The College Event Management System provides a simple, secure, and efficient solution for managing college events. By combining React, Firebase, and QR code technology, the application simplifies event registration, automates confirmation emails, and enables fast, accurate attendance tracking for both students and administrators.

---
