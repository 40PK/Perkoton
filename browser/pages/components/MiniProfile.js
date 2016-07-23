const React = require('react');

class MiniProfile extends React.Component {
  render (){
    return (
  		<div className='menu-mini-profile'>
  			<img src={this.props.avatar} className='avatar'/>
  			<div className='info'>{this.props.firstName}</div><br/>
  			<div className='info'>{this.props.lastName}</div>
  		</div>
  	);
	}
}

module.exports = MiniProfile;