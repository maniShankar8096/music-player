import React from "react";

const LibrarySong=({song,songs,setCurrentSong,audioRef,isSongPlaying,setSongs})=>{
    
    const songSelectHandler= async ()=>{
        await setCurrentSong(song);
        //update state of the selcted song
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
        //check if the song is playing if so play the selected song as well
        isSongPlaying && audioRef.current.play();
    }

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ?'selected':""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-descr">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;