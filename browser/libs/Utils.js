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

    static mousePositionElement(e) {

        function findPos(obj) {
            let curtop = 0;
            let curleft = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return {
                left : curleft,
                top : curtop
            };
        }

        function mousePositionDocument(e) {
            let posx = 0;
            let posy = 0;
            
            if (!e) {
                var e = window.event;
            }
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return {
                x : posx,
                y : posy
            };
        }

        function mouseTarget(e) {
            let targ;
            if (!e) var e = window.event;
            if (e.target) targ = e.target;
            else if (e.srcElement) targ = e.srcElement;
            if (targ.nodeType == 3) // defeat Safari bug
                targ = targ.parentNode;
            return targ;
        }

        let mousePosDoc = mousePositionDocument(e);
        let target = mouseTarget(e);
        let targetPos = findPos(target);
        let posx = mousePosDoc.x - targetPos.left;
        let posy = mousePosDoc.y - targetPos.top;
        return {
            x : posx,
            y : posy
        };
    }

}

export default Utils;