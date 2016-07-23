const React = require('react');

const TitleBarButtons = require('./components/TitleBarButtons');

const MenuContainer = require('./MenuContainer');
const MusicContainer = require('./MusicContainer');

const PerkVKApi = require('../libs/PerkVKApi');
const Utils = require('../libs/Utils');

const Remote = require('electron').remote;

let mainStorage = Remote.getGlobal('localStorage');

class Player extends React.Component {
	constructor(props) {
    super(props);

    this.state = { 
			avatar: '',
			firstName: '',
			lastName: ''
		};
  }

  componentWillMount() {
  	let VKApi = new PerkVKApi(this.props.token);

  	let userInfo = mainStorage.getItem('userInfo');

  	let scope = this;

  	if (userInfo == null) {
  		VKApi.get('users.get', {
  			user_ids: [this.props.user_id],
  			fields: 'photo_100'
  		}, (data) => {
  			if (data !== undefined && data.response !== undefined)
  				Utils.ImgURL2Base64(data.response[0].photo_100, (base64) => {
  					var info = {
  						avatar: base64,
  						firstName: data.response[0].first_name,
  						lastName: data.response[0].last_name
  					}

  					mainStorage.setItem('userInfo', info);

  					scope.setState(info);
  				});
  			});
  		} else {
  			this.setState(userInfo);
  		}
  	}

  	render() {
    	return ( 
    		<div>
    			<MenuContainer avatar={this.state.avatar} firstName={this.state.firstName} lastName={this.state.lastName}/>
    			<MusicContainer user_id={this.props.user_id} token={this.props.token}/>
          <div className='titlebar-drag-zone'>
    			 <TitleBarButtons/>
          </div>
    		</div>
    	);
  	}
}
 
module.exports = Player;