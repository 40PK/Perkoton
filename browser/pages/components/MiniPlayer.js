import React from "react";

import Utils from "../../libs/Utils";

let currentAudio;

class MiniPlayer extends React.Component {

    constructor( props ) {

      super( props );

      this.state = { 
        play: false,
        progressbar : 0,
        repeat: false,
        mute: false
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

      let scope = this;

      currentAudio = new Audio( new_props.music.url );
      currentAudio.muted = this.state.mute;
      currentAudio.play();

      currentAudio.addEventListener("ended", function(){

        if ( scope.state.repeat ){
          currentAudio.currentTime = 0;
          currentAudio.play();
        } else {
          scope.props.onControlFor();
        }
        
      });

      this.replaceState( {
        play: true
      } )

    }

    repeatButtonClick (){

      this.replaceState( {
        repeat: !this.state.repeat
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

    onProgressClick ( e ){

      if ( currentAudio === undefined )
        return;

      let relativePos = Utils.mousePositionElement( e );
      let progressWidth = e.target.clientWidth;

      let percent = relativePos.x * 100 / progressWidth;

      currentAudio.currentTime = currentAudio.duration * percent / 100;

      this.replaceState( {
        progressbar: percent
      } )

    }

    onVolumeClick (){
      
      this.replaceState( {
        mute: !this.state.mute
      } )

      currentAudio.muted = this.state.mute;

    }

  	render (){
    	return (
  			<div className={ this.props.hidden ? "mini-player hidden" : "mini-player"}>

  				<div className="main-group">
  					<i onClick={this.props.onControlBack} className="player-fast-button icon icon-lg icon-previous2"></i>
  					<i onClick={this.playButtonClick.bind( this )} className={ "player-play-button icon icon-2x " +  ( this.state.play ? "icon-pause2" : "icon-play3" ) }></i>
  					<i onClick={this.props.onControlFor} className="player-fast-button icon icon-lg icon-next2"></i>
  				</div>

  				<div className="control-group">
  				<i onClick={this.onVolumeClick.bind( this )} className={ "player-control-button icon " +  ( this.state.mute ? "icon-volume-mute2" : "icon-volume-medium" )}></i>
  				<i onClick={this.repeatButtonClick.bind( this )} className={ "player-control-button icon icon-loop " +  ( this.state.repeat ? "player-control-activated" : "" )}></i>
  				{/*<i className="player-control-button fa fa-random fa-fw"></i>*/}
  				</div>

          <div className="player-played-info">
            { ( this.props.music.id !== undefined ) ? this.props.music.artist + " - " + this.props.music.title : "Ничего не воспроизводится" }
          </div>
  				
          <div className="player-music-progress" onClick={this.onProgressClick.bind( this )}>
  					<span style={{ width: this.state.progressbar+"%" }}></span>
				  </div>
  			</div>
  		);
  	}

}

export default MiniPlayer;