/**
 * @author Tobias Nisius
 * @version 1.0
 */

app.service('sessionSrv',function($http){
	return{
		/**
		 * Creates a new device or updates device related data in backend
		 * @param device
         * @returns {*}
         */
		setDevice:function(device){
			var json = device;
			json["module"] = "session";
			json["action"] = "setDevice";
			return $http({url: server, method: "POST", data: json});
		}
	};
})