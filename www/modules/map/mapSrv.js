/**
* Requests Campus map data from backend
* @param uuid
* @returns {*}
*/
app.service('mapSrv', function($http) {
    return {
        getmap: function(uuid) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "getMap",
                    "action": "",
                    "uuid": uuid,
                    "lang": "en"
                }
            });
        }
    };
})