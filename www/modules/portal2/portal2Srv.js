/**
 * @author Tobias Nisius
 * @version 1.0
 */

app.service('portal2Srv',function($http){
	return{
		/**
		 * Requests schedule data for a specific date from backend
		 * @param uuid
		 * @param date
         * @returns {*}
         */
		getSchedule:function(uuid, date, lang){
			return $http({url: server, method: "POST", data:{"module": "portal2", "action": "getSchedule", "uuid": uuid, "date": date, "lang": lang}});
		},
		/**
		 * Requests detailed schedule data for a given id from backend
		 * @param uuid
		 * @param id
         * @returns {*}
         */
		getScheduleDetail:function(uuid, id, lang){
			return $http({url: server, method: "POST", data:{"module": "portal2", "action": "getScheduleDetail", "uuid": uuid, "id": id, "lang": lang}});
		}
	};
})