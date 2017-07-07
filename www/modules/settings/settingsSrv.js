/**
 * @author Tobias Nisius
 * @version 1.0
 */

app.service('settingsSrv', function($http) {
    return {
        /**
         * Request settings for a specific device from backend
         * @param uuid
         * @returns {*}
         */
        get: function(uuid) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "settings",
                    "action": "get",
                    "uuid": uuid
                }
            });
        },
        /**
         * Sets (updates) settings for a specific device in backend
         * @param uuid
         * @param key
         * @param value
         * @returns {*}
         */
        set: function(uuid, key, value) {
            var json = {};
            json[key] = String(value);
            json["uuid"] = uuid;
            json["module"] = "settings";
            json["action"] = "set";
            return $http({
                url: server,
                method: "POST",
                data: json
            });
        }
    };
})