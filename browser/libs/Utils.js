class Utils {

	static ImgURL2Base64( url, callback ){

		var xhr = new XMLHttpRequest();
    	xhr.responseType = 'blob';
    	xhr.onload = function() {
        	var reader  = new FileReader();
        	reader.onloadend = function () {
            	callback(reader.result);
        	}
        	reader.readAsDataURL(xhr.response);
    	};
    	xhr.open('GET', url);
    	xhr.send();

	}

}

export default Utils;