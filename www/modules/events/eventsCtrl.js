/**
 * @author Lukas Hannappel
 * @version 1.0
 *
 * @uses eventsSrv
 * @uses storageSrv
 */
app.controller('eventsCtrl', ['$scope', '$stateParams', '$cordovaCalendar', '$ionicLoading', '$ionicScrollDelegate', 'eventsSrv', 'storageSrv', function($scope, $stateParams, $cordovaCalendar, $ionicLoading, $ionicScrollDelegate, eventsSrv, storageSrv){
    // Page: events overview
    if(typeof $stateParams.id == "undefined") {
        $scope.shownMonths = [];

        /**
         * Toggles the different months
         *
         * @param month
         */
        $scope.toggleMonth = function(month) {
            if ($scope.isMonthShown(month)) {
                $scope.shownMonths.splice($scope.shownMonths.indexOf(month), 1);
            } else {
                $scope.shownMonths.push(month);
            }

            $ionicScrollDelegate.resize();
        };

        /**
         * Checks if the month is toggled or not
         *
         * @param month
         * @returns {boolean}
         */
        $scope.isMonthShown = function(month) {
            var index = $scope.shownMonths.indexOf(month);
            if($scope.shownMonths.indexOf(month) > -1){
                return true;
            }
            else {
                return false;
            }
        };

        /**
         * Refresh the events
         */
        $scope.eventsRefresh = function() {
            $scope.showError = false;
            $ionicLoading.show();

            /**
             * Load events from service
             */
            eventsSrv.getEvents(storageSrv.get("uuid")).success(function(response) {
                // save events locally
                storageSrv.setObject("events", response);

                $scope.months = [];

                /**
                 * iterate over every month
                 */
                response.forEach(function(entry) {
                    var pubdateArray = entry.startdate.split(", ");

                    // get name of month
                    var monthIndex = $scope.decodeMonth(pubdateArray[1], storageSrv.get('lang')) + " " + pubdateArray[0];

                    /**
                     * checks if there is already an entry for the month
                     *
                     * @param index
                     * @returns {boolean}
                     */
                    var isInMonths = function(index){
                        var result = false;
                        $scope.months.forEach(function(month){
                            if(month.name == index){
                                result = true;
                            }
                        });
                        return result;
                    };

                    // create months list and add events to every month
                    if(!isInMonths(monthIndex)){
                        // new month entry
                        $scope.months.push({name: monthIndex, events: [entry]});
                    }
                    else{
                        // month already in list, add event to month
                        $scope.months.forEach(function(month){
                            if(month.name == monthIndex){
                                month.events.push(entry);
                            }
                        })
                    }
                });

                // select first month
                var firstMonth = $scope.months[0].name;
                if(!$scope.isMonthShown(firstMonth)){
                    $scope.toggleMonth($scope.months[0].name);
                }

            }).error(function(data, status){
                // connection error
                $scope.showError = true;
            }).finally(function() {
                // refresh completed
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        /**
         * Decode month number into real name of month
         *
         * @param monthNo
         * @param language
         * @returns {string}
         */
        $scope.decodeMonth = function(monthNo, language){
            var monthnamesEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var monthnamesDE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            switch (language){
                case "en":
                    return monthnamesEN[monthNo - 1];
                    break;
                case "de":
                    return monthnamesDE[monthNo - 1];
                    break;
            }
        };

        // load events list
        $scope.eventsRefresh();
    }

    // Page: event details
    else {
        var events = storageSrv.getObject("events");

        /**
         * Iterate over all events to get details of selected event
         */
        events.forEach(function(element, index, array){
            if(element.id == $stateParams.id.replace(':', '')){
                $scope.event = element;
            }
        });

        /**
         * Create event to save in local calendar
         */
        $scope.createEvent = function() {
            var pubdateArray = $scope.event.startdate.split(", ");
            var startdate = new Date(pubdateArray[0], Number(pubdateArray[1]) - 1, pubdateArray[2], pubdateArray[3], pubdateArray[4], pubdateArray[5]);
            var enddate = new Date(pubdateArray[0], Number(pubdateArray[1]) - 1, pubdateArray[2], Number(pubdateArray[3]) + 2, pubdateArray[4], pubdateArray[5]);

            /**
             * Create entry in local calendar
             */
            $cordovaCalendar.createEventInteractively({
                title: $scope.event.title,
                location: $scope.event.location,
                notes: $scope.event.description,
                startDate: startdate,
                endDate: enddate
            }).then(function (result) {
                console.log("Event created successfully");
            }, function (err) {
                console.error("There was an error: " + err);
            });
        }
    }
}]);
