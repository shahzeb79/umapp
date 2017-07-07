/**
 * @author Tobias Nisius
 * @version 1.0
 *
 * @uses sessionSrv
 * @uses storageSrv
 */
app.controller('sessionCtrl', ['$scope', '$ionicPlatform', '$cordovaDevice', '$ionicModal', '$timeout', 'sessionSrv', 'storageSrv', '$ionicUser', function($scope, $ionicPlatform, $cordovaDevice, $ionicModal, $timeout, sessionSrv, storageSrv, $ionicUser) {

    // deviceID must be requested before further requests
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
     * Opens the Sports-Website in the native internet browser.
     * (called here because local native browser can only be addressed with javascript)
     */
    $scope.openSports = function() {
        window.open("http://www.hochschulsport.uni-mannheim.de/angebote/aktueller_zeitraum/m.html", "_system", "location=yes");
    }
}])