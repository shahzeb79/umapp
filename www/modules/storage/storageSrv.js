/**
 * @author Tobias Nisius
 * @version 1.0
 */

app.service('storageSrv', ['$window', function($window){
	return {
		/**
		 * Saves a string to local storage
		 * @param key
         * @param value
         */
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		/**
		 * Gets a string from local storage
		 * @param key
		 * @param defaultValue
         * @returns {*}
         */
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		/**
		 * Saves a value key pair in json format to local storage
		 * @param key
         * @param value
         */
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		/**
		 * Gets a json value by key from local storage
		 * @param key
         */
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		/**
		 * Clears the whole local storage
		 */
		clear: function() {
			$window.localStorage.clear();	
		}
	}
}]);