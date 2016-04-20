import React from "react";

import MenuButton from "./components/MenuButton";
import MiniProfile from "./components/MiniProfile";

class MenuContainer extends React.Component {

  	render (){

  		let menuButtons = [
  			{
  				text: "Мои аудиозаписи"
  			},
  			{
  				text: "Обновления друзей"
  			},
  			{
  				text: "Рекомендации"
  			},
  			{
  				text: "Популярное"
  			}
  		];

  		var buttons = menuButtons.map( function( button ) {
      		return <MenuButton text={button.text} key={button.text} />
    	} );

    	return (
  			<div className="menu-container">
  				<MiniProfile avatar={this.props.avatar} firstName={this.props.firstName} lastName={this.props.lastName}/>
  				{buttons}
  			</div>
  		);
  	}

}

export default MenuContainer;