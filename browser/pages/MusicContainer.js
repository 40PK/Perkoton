import React from "react";

import MiniPlayer from "./components/MiniPlayer";

class MusicContainer extends React.Component {

  	render (){
    	return (
  			<div className="music-container">
  				<div id="music-list"></div>
  				<MiniPlayer/>
  			</div>
  		);
  	}

}

export default MusicContainer;