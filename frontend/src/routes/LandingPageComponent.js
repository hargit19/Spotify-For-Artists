import { useNavigate } from "react-router-dom";

const LandingPageComponent = () => {
const navigate = useNavigate();
return(
    
        <div className="bg-black flex items-center justify-center h-screen overflow-hidden relative">
          {/* Background Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-700 opacity-20 rounded-full animate-ping"></div>
    
          {/* Content Container */}
          <div className="text-center z-10">
            {/* Heading with Animated Gradient */}
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-text-slide">
              Spotify
            </h1>
    
            {/* Subheading with Glowing Effect */}
            <h2 className="text-3xl text-green-400 mt-4 animate-glow">for artists</h2>
    
            {/* Get Started Button with Animated Border */}
            <button className="mt-10 px-8 py-3 bg-green-500 text-black font-semibold rounded-full relative group" onClick={() => {navigate("/somerandomshit")}}>
              <span className="absolute inset-0 w-full h-full bg-green-600 opacity-0 group-hover:opacity-100 transition duration-300 rounded-full"></span>
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
    
        
          <style>
            {`
              @keyframes text-slide {
                0% { background-position: 0%; }
                100% { background-position: 200%; }
              }
    
              .animate-text-slide {
                animation: text-slide 5s ease infinite;
                background-size: 200%;
              }
    
              @keyframes glow {
                0%, 100% { 
                  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc, 0 0 40px #00ffcc, 0 0 50px #00ffcc, 0 0 60px #00ffcc, 0 0 70px #00ffcc;
                }
                50% { 
                  text-shadow: 0 0 20px #00ffcc, 0 0 30px #00ffcc, 0 0 40px #00ffcc, 0 0 50px #00ffcc, 0 0 60px #00ffcc, 0 0 70px #00ffcc, 0 0 80px #00ffcc;
                }
              }
    
              .animate-glow {
                animation: glow 2s infinite alternate;
              }
            `}
          </style>
        </div>
)
}

export default LandingPageComponent;