app.controller('emegrancyCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPlatform, $compile) {
/*
    $ionicPlatform.ready(function() {
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);
            var myLatlng1 = new google.maps.LatLng(49.483186, 8.467498);
            var myLatlng2 = new google.maps.LatLng(49.483303, 8.464546);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
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
                var request1 = {
                    origin: myLatlng,
                    destination: myLatlng2,
                    travelMode: google.maps.TravelMode.WALKING
                };

                var request = {
                    origin: myLatlng,
                    destination: 'Polizeipräsidium Mannheim, L6, Mannheim',
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });

                directionsService1.route(request1, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay1.setDirections(response);
                    }
                });

                directionsDisplay.setMap(map);
                directionsDisplay1.setMap(map);

            });
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });

    });
    */
})