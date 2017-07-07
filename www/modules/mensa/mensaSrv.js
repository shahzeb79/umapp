/**
 * @author Lukas Hannappel
 * @version 1.0
 */
app.service('mensaSrv', function($http) {
    return {
      /**
       * Requests mensa data from backend
       * @param uuid
       * @param lang
       * @returns {*}
       */
        getMenu: function(uuid, lang) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "mensa",
                    "action": "getMenu",
                    "uuid": uuid,
                    "lang": lang
                }
            });
        }
    };
})
