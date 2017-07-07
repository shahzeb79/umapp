/**
 * @author Shahzeb Khan
 * @version 1.0
 *
 * @uses storageSrv
 * @uses mensaSrv
 */
app.controller('notiCtrl', function($scope, settingsSrv, $rootScope, $cordovaDevice, $cordovaGeolocation, storageSrv, $ionicLoading, $compile, $ionicPlatform, $ionicPush, $ionicUser) {

    $scope.myVar = true;
    $scope.showstartCard = true;
    $scope.showstartCard1 = true;
    // ********* Hide Map function **********//
    try {
        // get device information
        $scope.device = $cordovaDevice.getDevice();
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
    }
    $scope.hideMap = function() {
        $scope.isDisabled = false;
        $scope.myVar = !$scope.myVar;
        $scope.myVar1 = !$scope.myVar1;
        $scope.showstartCard = false;

    };
    $scope.pushNotification = {
        checked: false
    };
    $scope.pushNotification1 = {
        checked: false
    };

    $scope.items = [];

    $scope.edit = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };
    $scope.click = function click(message) {
        $scope.showNotification = false;

    };
    // ********* Show Map function **********//
    /*
        $scope.showMap = function() {
            $scope.isDisabled = true;
            $scope.myVar1 = !$scope.myVar1;
            $scope.myVar = !$scope.myVar;
            $scope.showstartCard = true;
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
            if (window.cordova) {
                cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                    alert("Location is " + (enabled ? "enabled" : "disabled"));
                    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;

                        var myLatlng = new google.maps.LatLng(lat, long);
                        var myLatlng1 = new google.maps.LatLng(49.483186, 8.467498);
                        var myLatlng2 = new google.maps.LatLng(49.483303, 8.464546);


                        var mapOptions = {
                            center: myLatlng,
                            zoom: 20,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        var map = new google.maps.Map(document.getElementById("map1"), mapOptions);
                        $scope.map = map;
                        $ionicLoading.hide();
                        google.maps.event.addListenerOnce($scope.map, 'idle', function() {

                            var directionsService = new google.maps.DirectionsService();
                            var directionsService1 = new google.maps.DirectionsService();
                            var directionsDisplay = new google.maps.DirectionsRenderer();
                            var directionsDisplay1 = new google.maps.DirectionsRenderer();

                            var request = {
                                origin: myLatlng,
                                destination: 'Polizeipräsidium Mannheim, L6, Mannheim',
                                travelMode: google.maps.TravelMode.WALKING
                            };
                            var request1 = {
                                origin: myLatlng,
                                destination: myLatlng2,
                                travelMode: google.maps.TravelMode.WALKING
                            };

                            directionsService.route(request, function(response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                }
                            });

                            directionsService1.route(request1, function(response1, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay1.setDirections(response1);
                                }
                            });

                            directionsDisplay.setMap(map);
                            directionsDisplay1.setMap(map);

                        });
                    }, function(err) {
                        $ionicLoading.hide();
                        cordova.plugins.diagnostic.switchToLocationSettings();
                        alert("The following error occurred: " + err);
                        console.log(err);
                    });
                }, function(error) {
                    alert("The following error occurred: " + error);
                    cordova.plugins.diagnostic.switchToLocationSettings();
                });
            };


        };

        */

    /**
     * Requests settings data from backend
     * Handles device tokens and uuid
     * Add uuids to database
     * Add device tokens to database
     * Handles incoming push notifications
     */
    settingsSrv.get(storageSrv.get("uuid")).success(function(response) {
        $scope.settings = response;
        if ($scope.settings.pushNotifications == "true") {
            $scope.pushNotification.checked = true;

            var user = $ionicUser.get();
            if (!user.user_id) {
                // Set your user_id here, or generate a random one
                user.user_id = $ionicUser.generateGUID()
            };

            angular.extend(user, {
                name: 'User',
                message: 'User Of Push Notifications'
            });

            $ionicUser.identify(user);
            // Handling Push notification here
            $ionicPush.register({
                canShowAlert: true,
                canSetBadge: true,
                canPlaySound: true,
                senderID: 'umapp-1355',
                canRunActionsOnWake: true,
                onNotification: function(notification) {

                    if (notification.event == "registered") {
                        settingsSrv.set(storageSrv.get("uuid"), "devicetoken", notification.regid);
                    } else {
                        $scope.items.push({
                            message: notification.message
                        });
                        $scope.showNotification = true;

                        $scope.lastNotification = notification.message;

                    }

                }

            }).then(function(deviceToken) {

                settingsSrv.set(storageSrv.get("uuid"), "devicetoken", deviceToken);

                $scope.token = deviceToken;


            });

        } else if ($scope.settings.pushNotifications == "false") {
            settingsSrv.set(storageSrv.get("uuid"), "devicetoken", "");
        }
    });

})