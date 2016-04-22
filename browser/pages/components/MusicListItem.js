import React from "react";

class MusicListItem extends React.Component {

  	render (){
    	return (
  			<div onClick={this.props.onClick} className="music-list-item">
  				<div className="author">{this.props.author}</div>
  				<div className="name">{this.props.name}</div>
  				<div className="time">{this.props.time}</div>
  			</div>
  		);
  	}

}

export default MusicListItem;