import React from "react";

import MiniPlayer from "./components/MiniPlayer";
import MusicListItem from "./components/MusicListItem";

import PerkVKApi from "../libs/PerkVKApi";


class MusicContainer extends React.Component {

	constructor( props ) {

    	super( props );

    	this.state = { 
			music: []
		};

  	}

	componentWillMount (){ 

		let VKApi = new PerkVKApi( this.props.token );

		let scope = this;

		VKApi.get( "audio.get", {
			owner_id: this.props.user_id,
			count: 10
		}, function ( data ){

			if ( data == undefined || data.response == undefined )
				return;

			let musicArray = [];

			for ( let i = 0; i < data.response.items.length; ++i ){

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

			scope.setState( {
				music : musicArray
			} );
		} );
	}

  	render (){

  		var musicList = this.state.music.map( function( item ) {
      		return <MusicListItem author={item.artist} name={item.title} time={item.time} key={item.id}/>
    	} );

    	return (
  			<div className="music-container">
  				<div className="music-list">
  					{musicList}
  				</div>
  				<MiniPlayer/>
  			</div>
  		);
  	}

}

export default MusicContainer;