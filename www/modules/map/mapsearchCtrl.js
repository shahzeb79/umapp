/**
 * @author Shahzeb Khan
 * @version 1.0
 *
 * @uses mapSrv
 * @uses storageSrv
 */
app.controller('mapsearchCtrl', ['$scope', '$stateParams', '$ionicLoading', 'mapSrv', 'storageSrv', function($scope, $stateParams, $ionicLoading, mapSrv, storageSrv, $http) {
    $scope.hideme1 = true;

    if (typeof $stateParams.building == "undefined") {
        /**
         *
         * Refreshes map list
         */
        $scope.mapRefresh = function() {
            $scope.showError = false;
            $ionicLoading.show();
            /**
             * Loads Map data from mapSrv
             *
             * @param device uuid
             */
            mapSrv.getmap(storageSrv.get("uuid")).success(function(map) {

                for (var q = 0; q < map.length; q++) {

                    map[q].category = map[q].category.replace("/", "");
                    map[q].room_number = map[q].room_number.replace("/", "-");

                }

                $scope.getmap = map;
                $scope.search = {
                    full_number: ""
                };
                $scope.clearSearch = function() {
                    $scope.search = '';
                };
            }).error(function(data, status) {
                $scope.showError = true;
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });

        };

        $scope.mapRefresh();

    } else {
        /**
         * Process map details view
         */
        var parameter = $stateParams.building;
        var fields = parameter.split(/~/);

        $scope.building = fields[0];
        $scope.room = fields[1];
        $scope.floor = fields[2];
        $scope.room_name = fields[3];
        $scope.category = fields[4];
        $scope.latitude = fields[5];
        $scope.longitude = fields[6];
    }
}])
