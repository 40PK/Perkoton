module.exports = function ( count_cb, onfinish ){

	if ( count_cb == 0 )
		return onfinish();

	var currentCount = 0;

	return {

		finish: function(){

			currentCount++;

			if ( currentCount == count_cb ){

				return onfinish();

			}

		}

	}

}