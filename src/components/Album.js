import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import formatTime from './../modules/formatTime'

 class Album extends Component {
	 constructor(props) {
		 super(props);

		 const album = albumData.find( album => {
			 return album.slug === this.props.match.params.slug
		 });

		 this.state = {
			 album: album,
			 currentSong: album.songs[0],
			 currentTime: 0,
			 duration: album.songs[0].duration,
			 volume: 0,
			 isPlaying: false,
			 currentSongNumber: null
		 };

	 	this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	 }

	 componentDidMount() {
		 this.eventListeners = {
			 timeupdate: e => {
				 this.setState({ currentTime: this.audioElement.currentTime });
			 },
			 durationchange: e => {
				 this.setState({ duration: this.audioElement.duration });
			 },
			 volumechange: e => {
				 this.setState({ volume: this.audioElement.volume });
			 }
		 };
		 this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
		 this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
		 this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
	 }

	 componentWillUnmount() {
		 this.audioElement.src = null;
		 this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
		 this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
		 this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
	 }

	 play() {
		 this.audioElement.play();
		 this.setState({ isPlaying: true });
	 }

	 pause() {
		 this.audioElement.pause();
		 this.setState({ isPlaying: false });
	 }

	 setSong(song) {
		 this.audioElement.src = song.audioSrc;
		 this.setState({ currentSong: song });
	 }

	 handleSongClick(song) {
		 const isSameSong = this.state.currentSong === song;
		 if (this.state.isPlaying && isSameSong) {
			 this.pause();
		 } else {
			 if (!isSameSong) {
				 this.setSong(song);
			 }
			 this.play();
		 }
	 }

	 handlePrevClick() {
		 const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		 const newIndex = Math.max(0, currentIndex - 1);
		 const newSong = this.state.album.songs[newIndex];
		 this.setSong(newSong);
		 this.play();
	 }

	 handleNextClick() {
		 const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		 const albumLength = this.state.album.songs.length;
		 const newIndex = Math.min(albumLength - 1, currentIndex + 1);
		 const newSong = this.state.album.songs[newIndex];
		 this.setSong(newSong);
		 this.play();
	 }

	 handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

	 handleVolumeChange(e) {
		 const newVol = e.target.value;
		 this.audioElement.volume = newVol;
		 this.setState({ volume: newVol});
	 }

	 handleMouseEnter(index) {
		 this.setState({ currentSongNumber: index });
	 }

	 handleMouseLeave() {
		 this.setState({ currentSongNumber: null });
	 }

	 handleSongIcon(song, index) {
		 if ((song === this.state.currentSong) && this.state.isPlaying) {
			 return <span className="icon ion-md-pause"></span>
		 } else if (index === this.state.album.songs.findIndex(song => this.state.currentSong === song) || index === this.state.currentSongNumber) {
		 	 return <span className="icon ion-md-play-circle"></span>
		 } else {
			 return index + 1
		 }
	 }


   render() {
     return (
       <section className="album">
         <section id="album-info">
				 	<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
					<div className="album-details">
						<h1 id="album-title">{this.state.album.title}</h1>
						<h2 className="artist">{this.state.album.artist}</h2>
						<div id="release-info">{this.state.album.releaseInfo}</div>
					</div>
				</section>
				<table id="song-list">
					<colgroup>
						<col id="song-number-column" />
						<col id="song-title-column" />
						<col id="song-duration-column" />
					</colgroup>
					<tbody>
             {this.state.album.songs.map( (song, index) =>
               <tr className="song"
							 key={index}
							 onClick={() => this.handleSongClick(song)}
							 onMouseEnter={() => this.handleMouseEnter(index)}
							 onMouseLeave={() => this.handleMouseLeave()}>
									<td className="songNumber">{this.handleSongIcon(song, index)}</td>
									<td>{song.title}</td>
									<td>{formatTime(song.duration)}</td>
								</tr>
							)}
					</tbody>
				</table>
				<PlayerBar
					isPlaying={this.state.isPlaying}
					currentSong={this.state.currentSong}
					currentTime={this.audioElement.currentTime}
					duration={this.audioElement.duration}
					volume={this.audioElement.volume}
					handleSongClick={() => this.handleSongClick(this.state.currentSong)}
					handlePrevClick={() => this.handlePrevClick()}
					handleNextClick={() => this.handleNextClick()}
					handleTimeChange={(e) => this.handleTimeChange(e)}
					handleVolumeChange={(e) => this.handleVolumeChange(e)}
					/>
			</section>
);
}
 }

 export default Album;
