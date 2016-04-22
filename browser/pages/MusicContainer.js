import React from "react";

import MiniPlayer from "./components/MiniPlayer";
import MusicListItem from "./components/MusicListItem";

import PerkVKApi from "../libs/PerkVKApi";
import APIErrorHandler from "../libs/APIErrorHandler";

let startMusicCount = 10;
let loadMoreMusicCount = 10;
let offsetMusic = 0;

let VKApi;

class MusicContainer extends React.Component {

	constructor( props ) {

    	super( props );

    	this.state = { 
			music: [],
			MiniPlayer: {}
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

			if ( data == undefined || data.error !== undefined )
				return APIErrorHandler.handle( data.error );

			let musicArray = [];

			let musicCount = data.response.items.length;

			for ( let i = 0; i < musicCount; ++i ){

				let duration = data.response.items[i].duration;
				let minutes = duration / 60 >> 0;
				let seconds = duration % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				data.response.items[i].time = `${minutes}:${seconds}`;

				musicArray.push( data.response.items[i] );

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

			if ( data == undefined || data.error !== undefined )
				return APIErrorHandler.handle( data.error );

			let musicArray = scope.state.music;

			let musicCount = data.response.items.length;

			for ( let i = 0; i < musicCount; ++i ){

				let duration = data.response.items[i].duration;
				let minutes = duration / 60 >> 0;
				let seconds = duration % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				data.response.items[i].time = `${minutes}:${seconds}`;

				musicArray.push( data.response.items[i] );

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

	replaceState ( new_state ){
		let currentState = this.state;

		let newStateKeys = Object.keys( new_state );

		for ( let i = 0; i < newStateKeys.length; ++i )
			currentState[newStateKeys[i]] = new_state[newStateKeys[i]];

		this.setState( currentState );
	}

	onMusicItemClick ( music_data ){

		this.replaceState({
			MiniPlayer : music_data
		});

	}

	onControlBackClick (){
		let currentIndex = this.getMusicIndexById( this.state.MiniPlayer.id );

		this.replaceState({
			MiniPlayer : this.state.music[currentIndex-1]
		});
	}

	onControlForClick (){
		let currentIndex = this.getMusicIndexById( this.state.MiniPlayer.id );

		this.replaceState({
			MiniPlayer : this.state.music[currentIndex+1]
		});
	}

	getMusicIndexById ( id ){

		for ( let i = 0, len = this.state.music.length; i < len; ++i ){
			if ( this.state.music[i].id == id ){
				return i;
			}
		}

	}

  	render (){

  		let scope = this;

  		let musicList = this.state.music.map( function( item ) {
      		return <MusicListItem onClick={scope.onMusicItemClick.bind( scope, item )} author={item.artist} name={item.title} time={item.time} key={item.id}/>
    	} );

    	return (
  			<div className="music-container">
  				<div onScroll={this.handleScroll.bind( this )} className="music-list">
  					{musicList}
  				</div>
  				<MiniPlayer onControlBack={this.onControlBackClick.bind( this )} onControlFor={this.onControlForClick.bind( this )} music={this.state.MiniPlayer}/>
  			</div>
  		);
  	}

}

export default MusicContainer;