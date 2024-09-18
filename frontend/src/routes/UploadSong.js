import {useState} from "react";
import TextInput from "../components/shared/textInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/loggedInContainer";

const UploadSong = () => {
   const [name,setname] = useState("");
   const [Thumbnail , setThumbnail] = useState("");
   const [playlistUrl , setPlaylistUrl] = useState("");
   const [uploadedSongFileName , setUploadedSongFileName] = useState("");
   const navigate = useNavigate();

   const submitSong = async () => {
    const data = {songName : name,
                 thumbnail : Thumbnail , 
                 track : playlistUrl
                  }

    const response = await makeAuthenticatedPOSTRequest("/song/create" , data);
    if(response && !response.error){
        
navigate("/home");
alert("song uploaded successfully");
    }
   }

    return (
        <LoggedInContainer>
                <div className="content p-8 pt-0 overflow-auto">
                    <div className="text-2xl font-semibold mb-5 text-white mt-8">
                        Upload Your Music
                    </div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TextInput
                                label="Name"
                                labelClassName={"text-white"}
                                placeholder="Name"
                                value={name}
                                setValue={setname}

                                
                            />
                        </div>
                        <div className="w-1/2">
                            <TextInput
                                label="Thumbnail"
                                labelClassName={"text-white"}
                                placeholder="Thumbnail"
                                value={Thumbnail}
                                setValue={setThumbnail}
                                
                            />
                        </div>
                    </div>
                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedSongFileName.substring(0, 35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload
                                setUrl={setPlaylistUrl}
                                setName={setUploadedSongFileName}
                            />
                        )}

                    </div>
                   
                    <div
                        className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold" onClick={(e) => {
                            e.preventDefault();
                            submitSong();
                        }}
                    >
                        Submit Song
                    </div>
                </div>
                </LoggedInContainer>
            
    );
};

export default UploadSong;