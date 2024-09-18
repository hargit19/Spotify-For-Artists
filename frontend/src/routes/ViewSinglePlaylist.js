import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/loggedInContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const ViewSinglePlaylist = () => {
let {playlistId} = useParams();

const [listedPlaylist , setlistedPlaylist] = useState([]);
const [playlistName , setplaylistName] = useState("");

useEffect(() => {
    const getData = async () => {
        const response = await makeAuthenticatedGETRequest("/playlist/get/" + playlistId);
        setplaylistName(response.name);
        console.log(response);
        setlistedPlaylist(response.songs);
    }
    getData();
},[])

return(
    <LoggedInContainer curActiveScreen="library">
        <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {playlistName}
                    </div>
                    <div className="pt-10 space-y-3">
                        {listedPlaylist.map((item) => {
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

export default ViewSinglePlaylist;