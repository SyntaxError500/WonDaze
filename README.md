# 🌟 WonDaze

**WonDaze** is a full-stack web application built to help users explore and list amazing travel experiences, places, and stays—similar to platforms like Airbnb. It includes user authentication, listing creation with images, location tagging, and review functionality.

---

## 🚀 Features

- 📝 Create, edit, and delete travel listings  
- 📸 Upload images via **Cloudinary**  
- 📍 Location-based tagging with **MapTiler**  
- ⭐ Leave reviews and ratings on listings  
- 🔒 Secure authentication using **Passport.js**  
- 🗂️ MongoDB-based backend with robust schema validation  
- 📅 Track time using Hackatime integration  

---

## 🧰 Tech Stack

**Frontend:**
- HTML5, CSS3  
- Bootstrap 5  
- JavaScript (vanilla)

**Backend:**
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- Passport.js (authentication)  
- Cloudinary & Multer (image storage)  
- MapTiler (maps)

**Dev Tools:**
- Hackatime (time tracking)  
- Dotenv (environment variables)  
- EJS (templating)

---

## 📦 Installation & Setup

1. **Clone the repository**git clone https://github.com/SyntaxError500/WonDaze.git
     cd WonDaze


2. **Install dependencies**
     npm install
   
3. **Set up your `.env` file**
Create a `.env` file in the root directory with the following keys:
      CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPTILER_KEY=your_maptiler_api_key
DB_URL=your_mongodb_url
SECRET=session_secret_key



4. **Run the app**
    node app.js


Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

     WonDaze/
├── public/
├── routes/
│ ├── listings.js
│ ├── reviews.js
│ └── users.js
├── models/
│ ├── Listing.js
│ ├── Review.js
│ └── User.js
├── controllers/
├── views/
│ ├── listings/
│ ├── reviews/
│ ├── users/
│ └── partials/
├── utils/
├── middleware.js
├── app.js
└── .env




---

## ✍️ Dev Log

- **Time Tracked with:** Hackatime  
- **Total Duration:** 26h 55m 9s  
- **Last Logged Session:** 26h 55m 9s  

_This project is under active development. Stay tuned for more features!_

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Feel free to fork the repo and open a PR.

---

## 📜 License

MIT License. Feel free to use, modify, or distribute this project.

---

## 🌐 Links

- 🌍 Live Demo: [Coming Soon]
- 🐙 GitHub: https://github.com/SyntaxError500/WonDaze

---

Made with ❤️ by SyntaxError500 (Sahil Vaswani)

