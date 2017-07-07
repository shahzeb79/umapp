/**
 * @author Lukas Hannappel
 * @version 1.0
 *
 * @uses storageSrv
 * @uses timetableSrv
 */
app.controller('timetableCtrl', ['$scope', '$stateParams', '$ionicLoading', 'storageSrv', 'timetableSrv', function($scope, $stateParams, $ionicLoading, storageSrv, timetableSrv){
  // Page: stations overview
  if(typeof $stateParams.id == "undefined") {
      $scope.stations = [];

      $scope.stations.push(
          {hafasID: "2417", name: "MA Hauptbahnhof", imgID: "trainStopThumb1", trainLines: "1, 3, 4/4A, 5, 5A/15, 8, 9", busLines: "60, 63, 64"},
          {hafasID: "2462", name: "Schloss", imgID: "trainStopThumb2", trainLines: "1, 5, 5A/15, 7", busLines: "60"},
          {hafasID: "2471", name: "Universität", imgID: "trainStopThumb3", trainLines: "1, 4/4A, 5, 5A/15, 7", busLines: "60"},
          {hafasID: "6004", name: "Mensa am Schloss", imgID: "trainStopThumb4", trainLines: "--", busLines: "60"},
          {hafasID: "6755", name: "Universität (West)", imgID: "trainStopThumb5", trainLines: "--", busLines: "60"}
      )
  }

  // Page: stations monitor
  else {
      var hafasID = $stateParams.id.replace(':', '');

      // decode hafasID to name
      switch (hafasID) {
          case "2417":
              $scope.station = "MA Hauptbahnhof";
              break;
          case "2462":
              $scope.station = "Schloss";
              break;
          case "2471":
              $scope.station = "Universität";
              break;
          case "6004":
              $scope.station = "Mensa am Schloss";
              break;
          case "6755":
              $scope.station = "Universität (West)";
              break;
      }

      /**
       * Refreshs timetable data
       */
      $scope.monitorRefresh = function() {
          $scope.showError = false;
          $ionicLoading.show();

          /**
           * Loads station monitor form service
           */
          timetableSrv.getStationMonitor(storageSrv.get("uuid"), hafasID).success(function (response) {

              // parse response into an array
              $scope.jsonResponse = JSON.parse(response.substring(0, response.length - 6));

              $scope.departures = $scope.jsonResponse.listOfDepartures;

              /**
               * iterates over all departures
               */
              $scope.departures.forEach(function (entry) {

                  // separate time and delays
                  var time = entry.time.substring(0, 5);
                  var delay = entry.time.substring(6, entry.time.length);

                  // show delay only, when train will come later
                  if(delay > 0){
                      entry.delay = " + " + delay;
                  }
                  else{
                      entry.delay = "";
                  }

                  // transportation type separation
                  if (entry.transportation == 'STRAB') {
                      entry.transportationType = 'train';
                  }
                  else {
                      entry.transportationType = 'bus';
                  }

                  // time separation
                  // train will come in less than 6 minutes
                  if (entry.differenceTime <= 5) {
                      entry.delay = "";

                      if (entry.differenceTime > 1) {
                          if (storageSrv.get("lang") == "en") {
                              entry.timeText = "in " + entry.differenceTime + " minutes";
                          }
                          else {
                              entry.timeText = "in " + entry.differenceTime + " Minuten";
                          }
                      }
                      else {
                          // tran is coming now
                          if (entry.differenceTime == 0) {
                              // language separation
                              if (storageSrv.get("lang") == "en") {
                                  entry.timeText = "now";
                              }
                              else {
                                  entry.timeText = "sofort";
                              }
                          }
                          // train will come in 1 minute
                          else {
                              // language separation
                              if (storageSrv.get("lang") == "en") {
                                  entry.timeText = "in 1 minute";
                              }
                              else {
                                  entry.timeText = "in 1 Minute";
                              }
                          }
                      }
                  }
                  // train will come in more than 5 minutes
                  else{
                      entry.timeText = time;
                  }
              });

          }).error(function (data, status) {
              // connection error
              $scope.showError = true;
          }).finally(function () {
              // refresh completed
              $scope.$broadcast('scroll.refreshComplete');
              $ionicLoading.hide();
          })
      };

      // load stationmonitor
      $scope.monitorRefresh();

      /**
       * Opens RNV website
       */
      $scope.openRNV = function(){
          window.open('http://www.rnv-online.de', '_system', 'resizable=yes', 'location=yes');
      }
  };
}]);
