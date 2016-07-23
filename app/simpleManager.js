module.exports = function(count_cb, onfinish) {
	if ( count_cb == 0 )
		return onfinish();

	let currentCount = 0;

	return {
		finish: () => {
			currentCount++;
			if (currentCount == count_cb) {
				return onfinish();
			}
		}
	}
}