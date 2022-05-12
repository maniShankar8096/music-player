import React,{useState,useRef} from 'react';
import './styles/App.scss';
import Song from "./components/Song";
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';

import data from './data';

function App() {
  
  //Refs
  const audioRef=useRef(null);
  //state
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong]=useState(songs.filter((s)=>s.active===true)[0]);
  const [isSongPlaying,setIsSongPlaying]=useState(false);
  const [songInfo,setSongInfo]=useState({currentTime:null,duration:null,animPercentage:0})
  const [libraryStatus,setLibraryStatus]=useState(false);

  //useEffect

  const timeUpdateHandler=(e)=>{
    const animPercentage=Math.round((e.target.currentTime/e.target.duration)*100) || 0;
    setSongInfo({currentTime:e.target.currentTime,duration:e.target.duration,animPercentage:animPercentage});
  }

  const songEndHandler = async ()=>{
    let songInd=songs.findIndex((s)=>s.id===currentSong.id);
    await setCurrentSong(songs[(songInd+1)%songs.length]);
    isSongPlaying && audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus && "library-active"}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player setIsSongPlaying={setIsSongPlaying} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} isSongPlaying={isSongPlaying} currentSong={currentSong} audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo}/>
      <Library libraryStatus={libraryStatus} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} audioRef={audioRef} isSongPlaying={isSongPlaying} setSongs={setSongs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler} />
    </div>
  );
}

export default App;
