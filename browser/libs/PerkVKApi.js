let APIBase = "https://api.vk.com/method/";
let v = "5.50";

class PerkVKApi {

	constructor ( token ){
		this.token = token;
	}

	get ( methodName, params, cb ){
		this._req( methodName, params, false, cb );
	}

	getSync ( methodName, params ){
		return this._req( methodName, params, true );
	}

	_req ( methodName, params, isSync, cb ){

		function makeParam ( key, value ){
			if ( Array.isArray( value ) )
				value = value.join( "," );

			return key + "=" + value;
		}

		let paramsKeys = Object.keys( params );
		let sendData = [];

		sendData.push( makeParam( "v", v ) );
		sendData.push( makeParam( "access_token", this.token ) );

		for ( let i = 0; i < paramsKeys.length; ++i )
			sendData.push( makeParam( paramsKeys[i], params[paramsKeys[i]] ) );

		let xhr = new XMLHttpRequest();
		xhr.open( 'GET', APIBase + methodName + "?" + sendData.join("&"), !isSync );
		xhr.send();
		
		if ( !isSync ){
			xhr.onreadystatechange = function() {
  				if (xhr.readyState != 4) return;

  				if (xhr.status == 200)
    				return cb( JSON.parse( xhr.responseText ) );
			}
		} else {
			return JSON.parse( xhr.responseText );
		}

	}
}

export default PerkVKApi;