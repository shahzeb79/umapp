/**
 * @author Lukas Hannappel
 * @version 1.0
 *
 * @uses storageSrv
 * @uses settingsSrv
 * @uses newsSrv
 * @uses eventsSrv
 */
app.controller('homeCtrl', ['$scope', '$state', '$rootScope', '$ionicLoading', 'storageSrv', 'settingsSrv', 'newsSrv', 'eventsSrv', function($scope, $state, $rootScope, $ionicLoading, storageSrv, settingsSrv, newsSrv, eventsSrv) {
    $scope.lNews = []; // latest news
    $scope.cEvents = []; // current events

    /**
     * Goes to other modules
     * @param state
     */
    $scope.goto = function(state) {
        $state.go(state)
    };

    /**
     * Refresh news and events
     */
    $scope.homeRefresh = function() {
        $scope.showError = false;
        $ionicLoading.show();

        /**
         * Requests events from backend
         */
        eventsSrv.getEvents(storageSrv.get("uuid")).success(function(response) {
            storageSrv.setObject("events", response);
            $scope.cEvents = response;
        }).error(function(data, status){
          // connection error
          $scope.showError = true;
        }).finally(function() {
          // refresh completed
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });

        /**
         * Requests news from backend
         */
        newsSrv.getNewsList(storageSrv.get("uuid")).success(function(response) {
            storageSrv.setObject("news", response);
            $scope.lNews= response;
        }).error(function(data, status){
          // connection error
          $scope.showError = true;
          $scope.Error = "Error Connecting server";
        }).finally(function() {
          // refresh completed
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.homeRefresh();
}]);
