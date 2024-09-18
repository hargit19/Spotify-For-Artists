import LoggedInContainer from "../containers/loggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";

const LibraryComponent = () => {
const [playlistdata , setplaylistdata] = useState([]);


useEffect(() => {
    const getData = async () => {
        const response = await makeAuthenticatedGETRequest(
            "/playlist/get/me"
        );
// console.log(response);
        setplaylistdata(response);
    };
    getData();
}, []);



return(
    <LoggedInContainer curActiveScreen="library">
<div className="text-white text-xl pt-8 font-semibold">
                My Playlists
            </div>

            <div className="py-5 grid gap-5 grid-cols-5">
                {playlistdata.map((item) => {
                    return (
                        <Card
                            key={JSON.stringify(item)}
                            title={item.name}
                            description=""
                            imgUrl={item.thumbnail}
                            playlistId={item._id}
                        />
                    );
                })}
            </div>
    </LoggedInContainer>
)
}

const Card = ({title, description, imgUrl, playlistId}) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
            onClick={() => {
                navigate("/playlist/get/" + playlistId);
            }}
        >
        
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default LibraryComponent;