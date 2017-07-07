/**
 * @author Lukas Hannappel
 * @version 1.0
 */
app.service('eventsSrv',function($http){
    return{
        /**
         * Requests events data from backend
         * @param uuid
         * @returns {*}
         */
        getEvents:function(uuid){
            return $http({
                url: server,
                method: "POST",
                data:{
                    "module": "events",
                    "action": "getEvents",
                    "uuid": uuid
                }
            });
        }
    };
});
