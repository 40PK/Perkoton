import React from "react";

class MenuButton extends React.Component {

  	render (){
    	return (
  			<div className="menu-button">
  				{this.props.text}
  			</div>
  		);
  	}

}

export default MenuButton;