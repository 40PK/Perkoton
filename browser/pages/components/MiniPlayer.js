import React from "react";

let currentAudio;

class MiniPlayer extends React.Component {

    constructor( props ) {

      super( props );

      this.state = { 
        play: false,
        progressbar : 0
      };

      setInterval( this.audioCurrentTimeChange.bind( this ), 1000 );

    }

    replaceState ( new_state ){
      let currentState = this.state;

      let newStateKeys = Object.keys( new_state );

      for ( let i = 0; i < newStateKeys.length; ++i )
        currentState[newStateKeys[i]] = new_state[newStateKeys[i]];

      this.setState( currentState );
    }

    componentWillReceiveProps ( new_props ){

      if ( new_props.music.url === undefined || new_props.music.id == this.props.music.id )
        return;

      if ( currentAudio !== undefined )
        currentAudio.pause();

      currentAudio = new Audio( new_props.music.url );
      currentAudio.play();

      this.replaceState( {
        play: true
      } )

    }

    playButtonClick (){

      if ( currentAudio === undefined )
        return;

      if ( this.state.play ){
        currentAudio.pause();
      } else {
        currentAudio.play();
      }

      this.replaceState( {
        play: !this.state.play
      } )

    }

    audioCurrentTimeChange (){

      if ( !this.state.play )
        return;

      let percent = currentAudio.currentTime * 100 / currentAudio.duration;

      this.replaceState( {
        progressbar: percent
      } )

    }

  	render (){
    	return (
  			<div className="mini-player">

  				<div className="main-group">
  					<i onClick={this.props.onControlBack} className="player-fast-button fa fa-fast-backward fa-fw"></i>
  					<i onClick={this.playButtonClick.bind( this )} className={ "player-play-button fa fa-fw fa-2x " +  ( this.state.play ? "fa-pause" : "fa-play" ) }></i>
  					<i onClick={this.props.onControlFor} className="player-fast-button fa fa-fast-forward fa-fw"></i>
  				</div>

  				<div className="control-group">
  				<i className="player-control-button fa fa-volume-up fa-fw"></i>
  				<i className="player-control-button fa fa-repeat fa-fw"></i>
  				<i className="player-control-button fa fa-random fa-fw"></i>
  				</div>

  				<div className="player-music-progress">
  					<span style={{ width: this.state.progressbar+"%" }}></span>
				</div>
  			</div>
  		);
  	}

}

export default MiniPlayer;