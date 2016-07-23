const app = require('app');
const BrowserWindow = require('browser-window');
const exec = require('child_process').exec;
const electron = require('electron');
const session = require('session');
const appConfig = require('./appConfig'); // you file with vk application app id
const localStorage = require('./localStorage');
const simpleManager = require('./simpleManager');
const globalShortcut = electron.globalShortcut;

global.localStorage = localStorage;
global.makeMain = makeMain;
global.makeLogin = makeLogin;
global.globalShortcut = globalShortcut;

let tokenRegex = /access_token=([^\x26\s]+)/g;
let userRegex = /user_id=([^\x26\s]+)/g;

let mainWindow = null;
let loginWindow = null;

app.on('ready', () => {
  let userData = localStorage.getItem('user');

  if ( userData == null || userData.token == undefined ){
    makeLogin();
  } else {
    makeMain();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

function makeMain (){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 400,
    frame: false
  });

  mainWindow.loadURL('file://' + __dirname + '/../browser/index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (appConfig.debug) mainWindow.openDevTools();
}

function makeLogin (){
  loginWindow = new BrowserWindow({
    width: 400,
    height: 300
  });

  loginWindow.webContents.session.cookies.get({}, (error, cookies) => {
    if (error) throw error;

    let cookLength = cookies.length;

    let cookieManager = new simpleManager( cookLength, function (){
      loginWindow.loadURL(`https://oauth.vk.com/authorize?client_id=${appConfig.appID}&display=popup&redirect_uri=https://oauth.vk.com/blank.html&scope=${appConfig.scope.join(',')}&response_type=token&v=5.50`);
    });

    let url, cookie;
    let i = cookLength - 1;
    while (i >= 0) {
      cookie = cookies[i];

      url = 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
      loginWindow.webContents.session.cookies.remove(url, cookie.name, (error) => {
        if (error) throw error;
        cookieManager.finish();
      });

      i--;
    }
  });

  loginWindow.on('closed', () => {
    loginWindow = null;
  });

  loginWindow.webContents.on('did-finish-load', () => {
    let url = loginWindow.webContents.getURL();

    if (url.startsWith('https://oauth.vk.com/blank.html')) {
      let token = url.match(tokenRegex)[0];
      token = token.split('=')[1];

      let user_id = url.match(userRegex)[0];
      user_id = user_id.split('=')[1];

      localStorage.setItem('user', {
        token: token,
        user_id: user_id
      });

      setImmediate(function() {
        makeMain();
        loginWindow.close();
      });
    }
  });
}

String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
  return this.indexOf(prefix) === 0;
};
