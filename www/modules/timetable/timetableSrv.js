/**
 * @author Lukas Hannappel
 * @version 1.0
 */
app.service('timetableSrv', function($http) {
    return{
        /**
         * Requests timetable data from backend
         * @param uuid
         * @param hafasID
         * @returns {*}
         */
        getStationMonitor:function(uuid, hafasID){
            return $http({
                url: server,
                method: "POST",
                data:{
                    "module": "timetable",
                    "action": "getStationMonitor",
                    "uuid": uuid,
                    "hafasID": hafasID
                }
            });
        }
    };
});
