/**
 * @author Tobias Nisius, Natalie Buchner
 * @version 1.0
 *
 * @uses storageSrv
 * @uses sessionSrv
 */

app.controller('introCtrl', ['$scope', '$state', '$ionicHistory', '$ionicSlideBoxDelegate', '$ionicUser', '$cordovaDevice', '$ionicPlatform', 'storageSrv', 'sessionSrv', function($scope, $state, $ionicHistory, $ionicSlideBoxDelegate, $ionicUser, $cordovaDevice, $ionicPlatform, storageSrv, sessionSrv) {

    $ionicPlatform.ready(function() {

        // Check if UUID not set, yet
        if(typeof storageSrv.get("uuid") == "undefined") {
            // Generate UUID
            var user = $ionicUser.get();
            if (!user.user_id) {
                user.user_id = $ionicUser.generateGUID();
            }
            storageSrv.set("uuid", user.user_id);
        }

        // update device information for every run of the app
        try {
            // get device information
            $scope.device = $cordovaDevice.getDevice();
            $scope.device.uuid = storageSrv.get("uuid");
        } catch (e) {
            // if app is not running on a device, get information from navigator (case: development)
            $scope.device = {
                "platform": navigator.platform,
                "version": "",
                "uuid": "testid",
                "cordova": "",
                "model": navigator.appCodeName,
                "manufacturer": "",
                "isVirtual": "true",
                "serial": ""
            };
            // set uuid for local testing on computer
            storageSrv.set("uuid", "testid");
        }

        // sent device information to backend
        sessionSrv.setDevice($scope.device).success(function (response) {
            if (response.success == "true") {
                //error handling
            }
        });
    });

    /**
     * Called to navigate to the main app
     */
    $scope.startApp = function() {
        if(window.localStorage['intro'] == 'true') {
            $state.go('app.settings')
        }
        else {
            window.localStorage['intro'] = true;
            $state.go('app.home');
        }
    };

    /**
     * Slide forward
     */
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    /**
     * Slide backward
     */
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    /**
     * Called each time the slide changes to track navigation
     * @param index
     */
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
}]);