var app = require( "app" );
var exec = require('child_process').exec;
var BrowserWindow = require( "browser-window" );
var localStorage = require( "./localStorage" );
var appConfig = require( "./appConfig" ); // you file with vk application app id
var simpleManager = require( "./simpleManager" );
var session = require( "session" );

global.localStorage = localStorage;

var tokenRegex = /access_token=([^\x26\s]+)/g;
var userRegex = /user_id=([^\x26\s]+)/g;

var mainWindow, loginWindow;

app.on('ready', function () {
	
    var userData = localStorage.getItem( "user" );

    if ( userData == null || userData.token == undefined ){

        makeLogin();

    } else {

        makeMain();

    }

});

function makeMain (){

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false
    });

    mainWindow.loadURL('file://' + __dirname + '/../browser/index.html');

    mainWindow.webContents.on('did-finish-load', function (){

        mainWindow.setTitle(app.getName());

    });

    mainWindow.on('closed', function (){

        mainWindow = null;

    });

}

function makeLogin (){

    loginWindow = new BrowserWindow({
        width : 400,
        height : 300
    });

    loginWindow.webContents.session.cookies.get({}, function(error, cookies) {

        if (error) throw error;

        var cookLength = cookies.length;

        var cookieManager = new simpleManager( cookLength, function (){
            loginWindow.loadURL( "https://oauth.vk.com/authorize?client_id=" + appConfig.appID + 
                                        "&display=popup&redirect_uri=https://oauth.vk.com/blank.html&scope=" + appConfig.scope.join(",") + 
                                        "&response_type=token&v=5.50" );
        } );

        var url, cookie;
        for (var i = cookLength - 1; i >= 0; i--) {

            cookie = cookies[i];

            url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +cookie.path;

            loginWindow.webContents.session.cookies.remove(  url, cookie.name, function(error) {
                if (error) throw error;
                cookieManager.finish();
            } );

        };

    });

    loginWindow.on('closed', function (){

        loginWindow = null;

    });

    loginWindow.webContents.on('did-finish-load', function (){

        var url = loginWindow.webContents.getURL();

        if ( url.startsWith( "https://oauth.vk.com/blank.html" ) ){

            var token = url.match( tokenRegex )[0];
            token = token.split( "=" )[1];

            var user_id = url.match( userRegex )[0];
            user_id = user_id.split( "=" )[1];

            localStorage.setItem( "user", {
                token : token,
                user_id : user_id
            } );

            loginWindow.close();
            makeMain();
        }

    });

}

String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
    return this.indexOf(prefix) === 0;
};
