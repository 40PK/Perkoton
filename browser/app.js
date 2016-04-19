import React from "react";
import ReactDOM from "react-dom";

import Player from "./pages/Player";
import { remote as Remote } from 'electron';

let mainStorage = Remote.getGlobal("localStorage");

let container = document.getElementById( "container" );

let userData = mainStorage.getItem( "user" );

ReactDOM.unmountComponentAtNode( container );

ReactDOM.render( <Player/>, container );

