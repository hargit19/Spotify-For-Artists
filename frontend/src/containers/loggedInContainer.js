import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { Howl , Howler } from 'howler';
import { useState  , useContext , useLayoutEffect , useRef , useEffect } from 'react';
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/createPlaylistModal";
import AddtoPlaylist from "../modals/AddtoPlaylist";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({children , curActiveScreen}) => {

    const [createPlaylistModalOpen , setCreatePlaylistModalOpen] = useState(false);
    const [addtoPlaylistModalOpen , setaddtoPlatlistModalOpen] = useState(false);
    const [nameInitials , setnameInitials] = useState("");

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);
    

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

const addSongToPlaylist = async (playlistId) => {
    let songId = currentSong._id;
    let payload = {songId , playlistId};

    const response = await makeAuthenticatedPOSTRequest("/playlist/add/song" , payload);
    if(response && !response.error){
        setaddtoPlatlistModalOpen(false);
        alert("song succesfully added");
    }

}


const addSongToLikedSongs = async () => {
    let songId = currentSong._id;
let payload = {songId}
    const response = await makeAuthenticatedPOSTRequest("/song/add/likedsong" , payload);
    console.log(response);
    if(response && !response.error){
        alert("added to liked songs");
    }

}

useEffect(() => {
    const getData = async () => {
        const response = await makeAuthenticatedGETRequest(
            "/song/getcredentials"
        );
// console.log(response.firstName[0] + response.lastName[0]);
setnameInitials(response.firstName[0] + response.lastName[0])
    };
    getData();
}, []);


return(

<div className="h-full w-full bg-app-black">
{createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}

{addtoPlaylistModalOpen && (
                <AddtoPlaylist
                    closeModal={() => {
                        setaddtoPlatlistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
<div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>

            {/* This first div will be the left panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    {/* This div is for logo */}
                    <div className="logoDiv p-6">
                        <img
                            src={spotify_logo}
                            alt="spotify logo"
                            width={125}
                        />
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home"}
                            displayText={"Home"}
                            active={curActiveScreen === "home"}
                            targetLink={"/home"}
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                            targetLink={"/search"}
                            active={curActiveScreen === "search"}
                        />
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            targetLink={"/library"}
                            active={curActiveScreen === "library"}
                        />
                       
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"My Songs"}
                            targetLink={"/mysongs"}
                            active={curActiveScreen === "mysongs"}
                            
                        />
                        
                    </div>
                    <div className="pt-5">
                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                            onClick={() => {setCreatePlaylistModalOpen(true)}}

                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                            active={curActiveScreen === "liked songs"}
                            targetLink={"/likedsongs"}
                        />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>
            {/* This second div will be the right part(main content) */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            <Link to="/uploadsong"><TextWithHover displayText={"Upload Song"} /></Link>
                            <div className="bg-white h-2/3 px-4 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                {nameInitials}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content p-8 pt-0 overflow-auto">
                {children}
                </div>
            </div>
            </div>
     {/* controls */}


            {currentSong && (
                <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.songName}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.owner.firstName +
                                    " " +
                                    currentSong.owner.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        {/* <div>Progress Bar Here</div> */}
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {setaddtoPlatlistModalOpen(true)}}
                    
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {addSongToLikedSongs()}}
                           
                        />
                    </div>
                </div>
            )}

        </div>
  

)
}

export default LoggedInContainer;