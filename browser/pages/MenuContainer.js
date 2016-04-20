import React from "react";

import MenuButton from "./components/MenuButton";

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
      		return <MenuButton text={button.text} />
    	} );

    	return (
  			<div className="menu-container">
  				{buttons}
  			</div>
  		);
  	}

}

export default MenuContainer;