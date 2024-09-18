import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './output.css'
import LoginComponent from "./routes/LoginComponent";
import SignUpComponent from "./routes/SignUpComponent";
import HomeComponent from "./routes/HomeComponent";
import LoggedInHomeComponent from "./routes/LoggedInHomeComponent"
import UploadSong from "./routes/UploadSong";
import SearchComponent from "./routes/SearchComponent";
import LibraryComponent from "./routes/LibraryComponent";
import ViewSinglePlaylist from "./routes/ViewSinglePlaylist";
import LandingPageComponent from "./routes/LandingPageComponent";
import LikedSongs from "./routes/LikedSongs";
import MySongs from "./routes/MySongs";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import { useState } from "react";

function App() {

  const[cookie,setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="App h-screen w-screen font-poppins">

      <BrowserRouter>
      {cookie.token ? 
      //logged in routes
     <songContext.Provider value={{currentSong  , setCurrentSong , soundPlayed , setSoundPlayed , isPaused , setIsPaused}} >
        <Routes>
       <Route path="/" element={<LandingPageComponent/>}/>
        <Route path="/home" element={<LoggedInHomeComponent />}/>
        <Route path="uploadsong" element={<UploadSong />}/>
        <Route path="/mysongs" element={<MySongs />}/>
        <Route path="/search" element={<SearchComponent />}/>
        <Route path="/library" element={<LibraryComponent />}/>
        <Route path="/playlist/get/:playlistId" element={<ViewSinglePlaylist />}/>
        <Route path="/likedsongs" element={<LikedSongs />}/>
        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes>
      </songContext.Provider>
      
      :
//not logged in routes
        <Routes>
          <Route path="/" element={<LandingPageComponent/>}/>
      <Route path="/" element={<div>hello</div>}/>
      <Route path="/home" element={<HomeComponent />}/>
        <Route path="/login" element={<LoginComponent />}/>
        <Route path="/signup" element={<SignUpComponent />}/>
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
      } 
    </BrowserRouter>
    </div>
  );
}

export default App;
