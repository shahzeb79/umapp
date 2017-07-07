/**
 * @author Shahzeb Khan
 * @version 1.0
 *
 */
app.service('radioSrv', function($http) {
    return {
        getradio: function(uuid) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "getRadio",
                    "action": "",
                    "uuid": uuid
                }
            });
        }
    };
})