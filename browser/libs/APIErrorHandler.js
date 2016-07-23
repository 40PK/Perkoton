const Remote = require('electron').remote;

let mainStorage = Remote.getGlobal('localStorage');

class APIErrorHandler {
	static handle(error) {
		switch(error.error_code) {
      case 5:
        mainStorage.removeItem('userInfo');
        mainStorage.removeItem('user');

        Remote.getGlobal('makeLogin')();
        Remote.getCurrentWindow().close();
      break;

      default:
        console.log(error);
      break;
    }
	}
}

module.exports = APIErrorHandler;