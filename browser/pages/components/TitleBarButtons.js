import React from "react";
import { remote as Remote } from "electron";

let currentWindow = Remote.getCurrentWindow();

class TitleBarButtons extends React.Component {

	onCloseButtonClick (){
		currentWindow.close();
	}

	onMaximizeButtonClick (){
		currentWindow.maximize(); 
	}

	onMinimizeButtonClick (){
		currentWindow.minimize(); 
	}

  render (){
    return (
  		<div className="titlebar-control-group">
  			<i className="titlebar-control-button fa fa-expand fa-fw" onClick={this.onMaximizeButtonClick}></i>
    		<i className="titlebar-control-button fa fa-minus fa-fw" onClick={this.onMinimizeButtonClick}></i>
    		<i className="titlebar-control-button fa fa-times fa-fw" onClick={this.onCloseButtonClick}></i>
  		</div>
  	);
  }

}

export default TitleBarButtons;