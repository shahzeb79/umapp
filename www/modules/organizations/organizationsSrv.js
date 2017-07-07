/**
 * @author Lena Burger
 * @version 1.0
 */

app.service('organizationsSrv', function($http) {
    return {
        /**
         * Requests organizations data from backend (list of all organizations)
         * @param uuid
         * @returns {*}
         */
        getOrganizationsList: function(uuid) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "organizations",
                    "action": "getOrganizationsList",
                    "uuid": uuid
                }
            });
        },
        /**
         * Requests detailed organization data for a given id from the server
         * @param uuid
         * @param id
         * @returns {*}
         */
        getOrganizationDetails: function(uuid, id) {
            return $http({
                url: server,
                method: "POST",
                data: {
                    "module": "organizations",
                    "action": "getOrganizationDetails",
                    "uuid": uuid,
                    "id": id
                }
            });
        }
    };
})