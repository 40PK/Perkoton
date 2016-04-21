import React from "react";

class MiniPlayer extends React.Component {

  	render (){
    	return (
  			<div className="mini-player">

  				<div className="main-group">
  					<i className="player-fast-button fa fa-fast-backward fa-fw"></i>
  					<i className="player-play-button fa fa-play fa-fw fa-2x"></i>
  					<i className="player-fast-button fa fa-fast-forward fa-fw"></i>
  				</div>

  				<div className="control-group">
  				<i className="player-control-button fa fa-volume-up fa-fw"></i>
  				<i className="player-control-button fa fa-repeat fa-fw"></i>
  				<i className="player-control-button fa fa-random fa-fw"></i>
  				</div>

  				<div className="player-music-progress">
  					<span style={{ width: "25%" }}></span>
				</div>
  			</div>
  		);
  	}

}

export default MiniPlayer;