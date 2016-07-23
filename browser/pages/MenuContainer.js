const React = require('react');

const MenuButton = require('./components/MenuButton');
const MiniProfile = require('./components/MiniProfile');

class MenuContainer extends React.Component {
  render (){
  	let menuButtons = [
  		{
  			text: 'Мои аудиозаписи',
        icon: 'user'
  		}/*,
  		{
  			text: 'Обновления друзей'
  		},
  		{
  			text: 'Рекомендации'
  		},
  		{
  			text: 'Популярное'
  		}*/
  	];

  	var buttons = menuButtons.map((button) => {
     	return <MenuButton icon={button.icon} text={button.text} key={button.text}/>
    });

    return (
  		<div className='menu-container'>
  			<MiniProfile avatar={this.props.avatar} firstName={this.props.firstName} lastName={this.props.lastName}/>
  			{buttons}
  		</div>
  	);
  }
}

module.exports = MenuContainer;