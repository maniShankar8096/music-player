import React from 'react';
import LibrarySong from './LibrarySong';

const Library=({songs,currentSong,setCurrentSong,audioRef,isSongPlaying,setSongs,libraryStatus})=>{
    return(
        <div className={`library ${libraryStatus?'library-open':""}`}>
            <h2>Library</h2>
            {songs.map(song=> <LibrarySong song={song} setSongs={setSongs} songs={songs} key={song.id} setCurrentSong={setCurrentSong} currentSong={currentSong} audioRef={audioRef} isSongPlaying={isSongPlaying}/>)}
        </div>
    )
}

export default Library;