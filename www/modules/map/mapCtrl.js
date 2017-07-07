/**
 * @author Shahzeb Khan
 * @version 1.0
 *
 * @uses cordovaGeolocation
 */
app.controller('mapCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $compile, $ionicHistory, $state) {
    $scope.showdirection = function() {

        $scope.direction = !$scope.direction;
    }

    /**
     * Loads Geolocation plugin
     */
    $ionicPlatform.ready(function() {

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        /**
         * Sets map options
         */
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        /**
         * Returns current position latitude and longitude
         * @param options
         */
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);
            var mapOptions = {
                center: myLatlng,
                zoom: 20,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
             var flightPlanCoordinates = [
          {lat: 49.485610 , lng: 8.459803},
          {lat:49.482272,   lng:  8.468131},
          {lat:49.481115,  lng:   8.467086},
          {lat: 49.484413, lng: 8.458524},
          {lat: 49.485610, lng:  8.459803},

        ];
        var flightPlanCoordinates1 = [
          {lat:49.484453,  lng:  8.463293},
          {lat:49.484142,  lng:  8.464043},
          {lat: 49.484838,  lng: 8.464696},
          {lat:49.485138,  lng: 8.463927},
           {lat: 49.484453, lng:  8.463293}
        ];
        var flightPlanCoordinates2 = [
          {lat:49.486799,   lng:  8.458012},
          {lat:49.487601,  lng:  8.458828},
          {lat: 49.488069, lng:  8.457719},
          {lat:49.487764,   lng: 8.457435},
           {lat: 49.488039,  lng:  8.456708},
            {lat:49.487465,    lng:  8.456208},
           {lat: 49.486799,  lng:  8.458012}
        ];
        var flightPlanCoordinates3 = [
          {lat:49.480278,    lng:  8.470103},
          {lat:49.480989,   lng:  8.468311},
          {lat: 49.481842,  lng:  8.469092},
          {lat:49.481185,   lng: 8.470854},
           {lat: 49.480278,  lng:  8.470103}

        ];
        var flightPlanCoordinates4 = [
          {lat:49.486135,     lng:  8.461396},
          {lat:49.485849,    lng: 8.462091},
          {lat:49.485194,   lng: 8.461480},
          {lat:49.485482,    lng:  8.460801},
           {lat:49.486135,     lng:  8.461396}

        ];
        var flightPlanCoordinates5 = [
          {lat:49.489146,     lng:  8.460230},
          {lat:49.489565,    lng: 8.459107},
          {lat:49.489892,   lng: 8.459403},
          {lat:49.489488,    lng: 8.460545},
           {lat:49.489146,     lng:  8.460230}

        ];
        var flightPlanCoordinates6 = [
          {lat:49.490407, lng: 8.460412},
          {lat:49.490210, lng: 8.460958},
          {lat:49.489927, lng: 8.460715},
          {lat:49.490122, lng: 8.460161},
          {lat:49.490407, lng: 8.460412}

        ];
        var flightPlanCoordinates7 = [
          {lat:49.484854, lng: 8.464960},
          {lat:49.484690, lng: 8.465381},
          {lat:49.484869, lng: 8.465536},
          {lat:49.485026, lng: 8.465121},
          {lat:49.484854, lng: 8.464960}

        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath1 = new google.maps.Polyline({
          path: flightPlanCoordinates1,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath2 = new google.maps.Polyline({
          path: flightPlanCoordinates2,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath3 = new google.maps.Polyline({
          path: flightPlanCoordinates3,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath4 = new google.maps.Polyline({
          path: flightPlanCoordinates4,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath5 = new google.maps.Polyline({
          path: flightPlanCoordinates5,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath6 = new google.maps.Polyline({
          path: flightPlanCoordinates6,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        var flightPath7 = new google.maps.Polyline({
          path: flightPlanCoordinates7,
          geodesic: true,
          strokeColor: '#819FF7',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        
         flightPath.setMap(map);
         flightPath1.setMap(map);
         flightPath2.setMap(map);
         flightPath3.setMap(map);
         flightPath4.setMap(map);
         flightPath5.setMap(map);
         flightPath6.setMap(map);
         flightPath7.setMap(map);
            directionsDisplay.setMap(map);

            $scope.map = map;

            $ionicLoading.hide();

            google.maps.event.addListenerOnce($scope.map, 'idle', function() {

                var place = $stateParams.building;
                place = place.replace("Bauteil A", "");
                place = place.replace("Bauteil B", "");
                place = place.replace("Bauteil C", "");
                place = place.replace("Bauteil D", "");
                place = place.replace(/\s/g, "");

                if (place == 'SchlossSchneckenhofWest' || place == 'SchlossTiefenmagazin' || place == 'SchlossWestflügel' || place == 'SchlossStilerHof' || place == 'SchlossEhrenhofOst' || place == 'SchlossEhrenhofWest' || place == 'SchlossMittelbau' || place == 'SchlossOstflügel' || place == 'SchlossSchneckenhof' || place == 'SchlossSchneckenhofSüd' || place == 'SchlossSchneckenhofOst' || place == 'SchlossSchneckenhofNord') {
                    place = 'Barockschloss Mannheim';
                }
                if (place == 'A3Bibl.,Hörsaalgebäude') {
                    place = 'A3';
                }
                var mode = document.getElementById("mode").value;
                var outputDiv = document.getElementById('output');

                var origin1 = myLatlng;
                var destinationA = place + ', Mannheim';
                var service = new google.maps.DistanceMatrixService();

                /**
                 * Draw route from source to destination
                 * @param source, destination and travel mode
                 */
                var request = {
                    origin: myLatlng,
                    destination: place + ', Mannheim',
                    travelMode: google.maps.TravelMode[mode],
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                };
                directionsService.route(request, function(response, status) {

                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });

                /**
                 * Calculate time and distance from source to destination
                 * @param source, destination and travel mode
                 */
                service.getDistanceMatrix({
                    origins: [origin1],
                    destinations: [destinationA],
                    travelMode: google.maps.TravelMode[mode],
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function(response, status) {

                    if (status == google.maps.DistanceMatrixStatus.OK) {
                        var results = response.rows[0].elements;
                        outputDiv.innerHTML = '<a class="button"> <b>Distance : </b> ' + results[0].distance.text + ' </a><a class="button"> <b>Time :</b> ' + results[0].duration.text + ' </a>';
                    }
                });

            });

        }, function(error) {
            $ionicLoading.hide();
            alert("Turn On Location");
        });

    });
})
