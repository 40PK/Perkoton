var app = require( "app" );
var BrowserWindow= require( "browser-window" );

app.on('ready', function () {
	
	mainWindow = new BrowserWindow({

        width: 800,
        height: 600,
        frame: false

    });

    mainWindow.loadURL('file://' + __dirname + '/../browser/index.html');

    mainWindow.openDevTools();

    mainWindow.webContents.on('did-finish-load', function (){

        mainWindow.setTitle(app.getName());

    });

    mainWindow.on('closed', function (){

        mainWindow = null;

    });

});