# **Spotify - for Artists**

A web application designed to empower artists to manage their music, connect with their audience, and analyze their performance metrics.

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## **Features**

- **User Authentication:**  
  Secure sign-up and login using **JWT**, **Passport.js**, and password hashing for enhanced security.

- **Song Browsing:**  
  Intuitive music discovery with efficient searching and filtering by genre, popularity, and release date.

- **Song Upload:**  
  Direct song uploads using **Cloudinary** to minimize storage issues while ensuring fast and reliable media handling.

- **Personalized Playlists:**  
  Create and manage custom playlists stored in **MongoDB Atlas** for quick retrieval and user engagement.

- **Liked Songs:**  
  Save favorite tracks in a dedicated section, enhancing user experience and fostering a deeper connection to the music.

## **Tech Stack**

- **Frontend:**
  - **React.js**: For building a dynamic and interactive user interface.
  - **Tailwind CSS**: For responsive design with utility-first styling.

- **Backend:**
  - **Node.js**: Server-side JavaScript runtime for building the backend API.
  - **Express.js**: Web framework for Node.js, simplifying RESTful API creation.
  - **MongoDB Atlas**: Cloud-based NoSQL database for scalable user and music data storage.
  - **Cloudinary**: For efficient media storage and management.

- **Deployment:**
  - **Vercel**: For seamless deployment and hosting of the frontend application.
  - **Render**: For Backend Deployement and faster API Callbacks

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/spotify-for-artists.git

2. **Navigate to the project directory:**

   ```bash
   cd spotify-for-artists

3. **Install dependencies:**

   ```bash
   npm install 

4. **Set up environment variables:**

5. **Run the application:**

   ```bash
   npm start
