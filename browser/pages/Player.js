import React from "react";

import TitleBarButtons from "./components/TitleBarButtons";

import MenuContainer from "./MenuContainer";

class Player extends React.Component {

  render() {
    return ( 
    	<div>
    		<MenuContainer/>
    		<TitleBarButtons/>
    	</div>
    );

  }

}
 
export default Player;