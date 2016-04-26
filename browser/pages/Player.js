import React from "react";

import TitleBarButtons from "./components/TitleBarButtons";

import MenuContainer from "./MenuContainer";
import MusicContainer from "./MusicContainer";

import PerkVKApi from "../libs/PerkVKApi";
import Utils from "../libs/Utils";

import { remote as Remote } from 'electron';

let mainStorage = Remote.getGlobal("localStorage");

class Player extends React.Component {

	constructor( props ) {

    super( props );

    this.state = { 
			avatar: "",
			firstName: "",
			lastName: ""
		};

  }

  	componentWillMount (){

  		let VKApi = new PerkVKApi( this.props.token );

  		let userInfo = mainStorage.getItem( "userInfo" );

  		let scope = this;

  		if ( userInfo == null ){

  			VKApi.get( "users.get", {
  				user_ids: [this.props.user_id],
  				fields: "photo_100"
  			}, function ( data ){

  				if ( data !== undefined && data.response !== undefined )
  					Utils.ImgURL2Base64( data.response[0].photo_100, function ( base64 ){

  						var info = {
  							avatar: base64,
  							firstName: data.response[0].first_name,
  							lastName: data.response[0].last_name
  						}

  						mainStorage.setItem( "userInfo", info );

  						scope.setState( info );

  					} );

  			} );

  		} else {

  			this.setState( userInfo );

  		}

  	}

  	render (){

    	return ( 
    		<div>
    			<MenuContainer avatar={this.state.avatar} firstName={this.state.firstName} lastName={this.state.lastName}/>
    			<MusicContainer user_id={this.props.user_id} token={this.props.token}/>
          <div className="titlebar-drag-zone">
    			 <TitleBarButtons/>
          </div>
    		</div>
    	);

  	}

}
 
export default Player;