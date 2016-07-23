const React = require('react');
const Remote = require('electron').remote;

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
  		<div className='titlebar-control-group'>
  			<i className='titlebar-control-button icon icon-enlarge' onClick={this.onMaximizeButtonClick}></i>
    		<i className='titlebar-control-button icon icon-minus' onClick={this.onMinimizeButtonClick}></i>
    		<i className='titlebar-control-button icon icon-cross' onClick={this.onCloseButtonClick}></i>
  		</div>
  	);
  }
}
 
module.exports = TitleBarButtons;