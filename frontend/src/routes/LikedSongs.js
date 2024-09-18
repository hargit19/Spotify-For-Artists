import { useState , useEffect} from "react";
import LoggedInContainer from "../containers/loggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const LikedSongs = () => {

    const [likedSongData , setlikedSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/view/likedsong");
            setlikedSongData(response.likedSongs);
            console.log(response.likedSongs);
        }
        getData();
    },[])

return(
    <LoggedInContainer curActiveScreen="liked songs">
        <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        Liked Songs
                    </div>
                    <div className="pt-10 space-y-3">
                        {likedSongData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
    </LoggedInContainer>
)
}

export default LikedSongs;