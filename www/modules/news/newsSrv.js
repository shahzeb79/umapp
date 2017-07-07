/**
 * @author Tobias Nisius
 * @version 1.0
 */

app.service('newsSrv',function($http){
	return{
		/**
		 * Requests news data from backend (usually 10 entries)
		 * @param uuid
		 * @param count
         * @returns {*}
         */
		getNewsList:function(uuid, count){
			return $http({url: server, method: "POST", data:{"module": "news", "action": "getNewsList", "uuid": uuid, "count": count}});
		},
		/**
		 * Requests detailed news data for a given id from the server
		 * @param uuid
		 * @param id
         * @returns {*}
         */
		getNewsDetail:function(uuid, id){
			return $http({url: server, method: "POST", data:{"module": "news", "action": "getNewsDetail", "uuid": uuid, "id": id}});
		}
	};
})