import SingleSongCard from '../components/shared/SingleSongCard';
import { useState , useEffect } from 'react';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import LoggedInContainer from '../containers/loggedInContainer';

const MySongs = () => {
  
const [songData , setSongData] = useState([]);

useEffect( () => {
    const getData = async () => {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        setSongData(response.data);
    }
    getData();
} , []);


    return (
        <LoggedInContainer curActiveScreen="mysongs">
<div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
    My Songs
    </div>
    <div className="space-y-3 overflow-auto">
        {songData.map( (song) => {
return <SingleSongCard info={song} />
        })}
    </div>
    </LoggedInContainer>
  
    );
};

export default MySongs;