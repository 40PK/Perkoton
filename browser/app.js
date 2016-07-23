const React = require('react');
const ReactDOM = require('react-dom');

const Player = require('./pages/Player');
const Remote = require('electron').remote;

let mainStorage = Remote.getGlobal('localStorage');

let container = document.getElementById('container');

let userData = mainStorage.getItem('user');

ReactDOM.unmountComponentAtNode(container);

ReactDOM.render(<Player user_id={userData.user_id} token={userData.token}/>, container);

