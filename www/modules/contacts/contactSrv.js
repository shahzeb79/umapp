/**
 * @author Shahzeb Khan, Lena Burger
 * @version 1.0
 */
app.service('contactSrv', function($http) {
    return {
        /**
         * Requests contacts data from backend
         * @param uuid
         * @returns {*}
         */
        getcontact: function(uuid) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "getContacts",
                    "action": "",
                    "uuid": uuid,
                    "lang": "en"
                }
            });
        }
    };
})