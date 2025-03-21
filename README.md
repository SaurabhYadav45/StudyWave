# StudyWave - Online Learning Platform

StudyWave is a full-stack **EdTech platform** that enables instructors to create and sell courses while allowing students to explore, purchase, and learn from various courses. Built with modern web technologies, StudyWave offers a seamless learning experience.
Deployment Link : https://studywave-frontend.onrender.com/

## 🚀 Features
- **Instructor Dashboard**: Create, manage, and sell courses.
- **Student Dashboard**: Purchase and track enrolled courses.
- **Secure Payment System**: Integration with a payment gateway (Razorpay) for seamless transactions.
- **User Authentication**: Secure login and registration system using JWT and Cookies.
- **Course Management**: Upload course materials, videos, and content management.
- **Responsive Design**: Fully optimized for mobile and desktop users.
- **State Management**: Implemented using Redux Toolkit & React-Redux.
- **Interactive UI**: Clean and intuitive design for easy navigation.

## 🛠️ Tech Stack
### Frontend:
- **React.js** - UI Framework
- **Redux Toolkit & React-Redux** - State Management
- **Tailwind CSS** - Styling

### Backend:
- **Node.js** - JavaScript Runtime
- **Express.js** - Backend Framework
- **Mongoose** - ODM for MongoDB
- **MongoDB** - NoSQL Database

### Deployment:
- **Render** (for hosting backend & frontend)
- **Cloudinary** (for media storage, if applicable)

## 🏗️ Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB running locally or a cloud database (MongoDB Atlas)

### Clone the Repository:
```sh
git clone https://github.com/your-username/StudyWave.git
cd StudyWave
```

### Install Dependencies
#### Frontend:
```sh
cd client  # Navigate to frontend folder
npm install
npm start
```

#### Backend:
```sh
cd server  # Navigate to backend folder
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_api_key (if using payments)
```

## 📌 Usage
1. **Instructor**: Register/Login -> Create a course -> Publish and sell courses.
2. **Student**: Register/Login -> Browse courses -> Purchase -> Learn at their own pace.

## 📷 Screenshots
(Add relevant screenshots of your platform here)

## 🚀 Deployment
StudyWave is deployed on **Render** and accessible at:
[Live Demo](your-live-url)

## 🤝 Contributing
Feel free to fork this repo and submit PRs to enhance StudyWave.

## 📜 License
MIT License

---

✨ Developed with ❤️ by [Saurabh Yadav]



