import React from "react";
//import fontawesomeicon component 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//importing required svg icons to be passed as prop for fontawesomeicon component
import {faPlay, faBackwardStep, faForwardStep,faPause,faSpinner} from '@fortawesome/free-solid-svg-icons';


const Player=({currentSong,setCurrentSong,songs,setSongs,isSongPlaying,setIsSongPlaying,audioRef,songInfo,setSongInfo})=>{

    //songActiveHandler
    const songActiveHandler=(song)=>{
        const newSongs=songs.map((s)=>{
            if(s.id===song.id){
                return({
                    ...s,
                    active:true,
                })
            }else{
                return({
                    ...s,
                    active:false,
                })
            }
        })
        //update newSongs list
        setSongs(newSongs);
        isSongPlaying && audioRef.current.play();
    }  
    //clickHandlers
    const playClickHandler=()=>{
        if(isSongPlaying){
            audioRef.current.pause();
        }else{
            audioRef.current.play();
        }
        setIsSongPlaying(!isSongPlaying);
    }

    const dragHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value});
    }

    const formatTime=(time)=>{
        return( Math.floor(time/60) + " : " + ("0" +Math.floor(time%60)).slice(-2));
    }

    const skipClickHandler= async (direction)=>{
        
        let songInd=songs.findIndex((s)=>s.id===currentSong.id);
        let newSong;
        if(direction==="skip-backward"){
            songInd===0?newSong=songs[songs.length-1]:newSong=songs[(songInd-1)%songs.length];
        }else if(direction==="skip-forward"){
            newSong=songs[(songInd+1)%songs.length];
        }
        await setCurrentSong(newSong);
        songActiveHandler(newSong);
        
    }

    //styles
    const animstyle={transform : `translateX(${songInfo.animPercentage}%)`};
    const sliderStyle={background:`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}

    return(
        <div className="player">
            <div className="time-controller">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div className="track" style={sliderStyle}>
                    <input type="range" min="0" value={songInfo.currentTime??0} max={isNaN(songInfo.duration)?10:songInfo.duration} onChange={dragHandler}/>
                    <div className="animate-track" style={animstyle}></div>
                </div>
                <p>{isNaN(songInfo.duration)?formatTime(0):formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-controller">
                <FontAwesomeIcon className="skip-backward" size="2x" icon={faBackwardStep} onClick={()=>{skipClickHandler("skip-backward")}}/>
                {isNaN(songInfo.duration)?<FontAwesomeIcon className="loading" size="2x" icon={faSpinner}/>:<FontAwesomeIcon onClick={playClickHandler} className="play" size="2x" icon={isSongPlaying?faPause:faPlay}/>}
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faForwardStep} onClick={()=>{skipClickHandler("skip-forward")}} />
            </div>
            
        </div>
    )
}

export default Player;