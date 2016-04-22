import React from "react";

import MiniPlayer from "./components/MiniPlayer";
import MusicListItem from "./components/MusicListItem";

import PerkVKApi from "../libs/PerkVKApi";

let startMusicCount = 10;
let loadMoreMusicCount = 10;
let offsetMusic = 0;

let VKApi;

class MusicContainer extends React.Component {

	constructor( props ) {

    	super( props );

    	this.state = { 
			music: []
		};

  	}

	componentWillMount (){ 

		VKApi = new PerkVKApi( this.props.token );

		let scope = this;

		VKApi.get( "audio.get", {
			owner_id: this.props.user_id,
			count: startMusicCount,
			offset: offsetMusic
		}, function ( data ){

			if ( data == undefined || data.response == undefined )
				return;

			let musicArray = [];

			let musicCount = data.response.items.length;

			for ( let i = 0; i < musicCount; ++i ){

				let duration = data.response.items[i].duration;
				let minutes = duration / 60 >> 0;
				let seconds = duration % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				musicArray.push( {
					id: data.response.items[i].id,
					artist: data.response.items[i].artist,
					title: data.response.items[i].title,
					time: `${minutes}:${seconds}`
				} );

			}

			offsetMusic += musicCount;

			scope.setState( {
				music : musicArray
			} );
		} );
	}

	loadMoreMusic (){

		let scope = this;

		VKApi.get( "audio.get", {
			owner_id: this.props.user_id,
			count: loadMoreMusicCount,
			offset: offsetMusic
		}, function ( data ){

			if ( data == undefined || data.response == undefined )
				return;

			let musicArray = scope.state.music;

			let musicCount = data.response.items.length;

			for ( let i = 0; i < musicCount; ++i ){

				let duration = data.response.items[i].duration;
				let minutes = duration / 60 >> 0;
				let seconds = duration % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				musicArray.push( {
					id: data.response.items[i].id,
					artist: data.response.items[i].artist,
					title: data.response.items[i].title,
					time: `${minutes}:${seconds}`
				} );

			}

			offsetMusic += musicCount;

			scope.setState( {
				music : musicArray
			} );
		} );

	}

	handleScroll ( event ){
		if ( event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight)
			this.loadMoreMusic();
	}

  	render (){

  		var musicList = this.state.music.map( function( item ) {
      		return <MusicListItem author={item.artist} name={item.title} time={item.time} key={item.id}/>
    	} );

    	return (
  			<div className="music-container">
  				<div onScroll={this.handleScroll.bind( this )} className="music-list">
  					{musicList}
  				</div>
  				<MiniPlayer/>
  			</div>
  		);
  	}

}

export default MusicContainer;