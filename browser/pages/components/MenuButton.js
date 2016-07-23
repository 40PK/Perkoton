const React = require('react');

class MenuButton extends React.Component {
  render (){
    return (
  		<div className={'menu-button icon icon-' + this.props.icon}>
  			{this.props.text}
  		</div>
  	);
  }
}

module.exports = MenuButton;