import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
	constructor(props) {
		super(props);
		this.state = { albums: albumData };
	}

	render() {
		return (
			<section className='library'>
				{
					this.state.albums.map( (album, index) =>
						<Link to={`/album/${album.slug}`} key={index}>
						<div className="album-section">
							<img src={album.albumCover} alt={album.title} />
							<div className="album-info">
								<div>Album: {album.title}</div>
								<div>By {album.artist}</div>
								<div>Length: {album.songs.length} songs</div>
							</div>
						</div>
						</Link>
					)
				}
			</section>
		);
	}
}

export default Library;
