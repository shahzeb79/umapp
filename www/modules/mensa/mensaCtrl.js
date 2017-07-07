/**
 * @author Lukas Hannappel, Shahzeb Khan
 * @version 1.0
 *
 * @uses storageSrv
 * @uses mensaSrv
 */
app.controller('mensaCtrl', ['$scope', 'mensaSrv', 'storageSrv', '$ionicSlideBoxDelegate', '$ionicLoading', '$ionicScrollDelegate', function($scope, mensaSrv, storageSrv, $ionicSlideBoxDelegate, $ionicLoading, $ionicScrollDelegate) {

  /**
   * Refresh menu entries
   */
  $scope.mensaRefresh = function() {
      $ionicLoading.show();

      $scope.showError = false;

      $scope.days = [];
      $scope.i = 0;

      /**
       * Requests menu data from backend
       */
      mensaSrv.getMenu(storageSrv.get("uuid"), storageSrv.get("lang")).success(function(data) {

          /**
           * Iterates over response data
           */
          data.forEach(function(entry) {
              var day = entry[0];
              var menus = [];

              // check if mensa is closed that day
              if(entry[1] == "closed" || entry.length < 15){
                  if(storageSrv.get("lang") == 'de'){
                      menus.push({title: "An diesem Tag hat die Mensa geschlossen!"});
                  }
                  else{
                      menus.push({title: "Mensa is closed that day!"});
                  }
              }
              else{
                  // superscript additives in meal descriptions
                  var meal1 = entry[2].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");
                  var meal2 = entry[6].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");
                  var meal3 = entry[10].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");
                  var meal4 = entry[14].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");
                  var meal5 = entry[18].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");
                  var meal6 = entry[22].replace(/\[/g, "<sup>[").replace(/\]/g, "]</sup>");

                  // decode label images
                  var labels1 = [];
                  entry[3].split(", ").forEach(function(label){
                      labels1.push({title: label});
                  });
                  var labels2 = [];
                  entry[7].split(", ").forEach(function(label){
                      labels2.push({title: label});
                  });
                  var labels3 = [];
                  entry[11].split(", ").forEach(function(label){
                      labels3.push({title: label});
                  });
                  var labels4 = [];
                  entry[15].split(", ").forEach(function(label){
                      labels4.push({title: label});
                  });
                  var labels5 = [];
                  entry[19].split(", ").forEach(function(label){
                      labels5.push({title: label});
                  });
                  var labels6 = [];
                  entry[23].split(", ").forEach(function(label){
                      labels6.push({title: label});
                  });

                  // mensa not closed, add different menus to array
                  if(entry[1].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[1], meal: meal1, price: entry[4], labels: labels1, color: "#B22222"});
                  }
                  if(entry[5].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[5], meal: meal2, price: entry[8], labels: labels2, color: "#B22222"});
                  }
                  if(entry[9].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[9], meal: meal3, price: entry[12], labels: labels3, color: "green"});
                  }
                  if(entry[13].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[13], meal: meal4, price: entry[16], labels: labels4, color: "#4682B4"});
                  }
                  if(entry[17].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[17], meal: meal5, price: entry[20], labels: labels5, color: "#4682B4"});
                  }
                  if(entry[21].substring(0, 4) != 'Mo -') {
                    menus.push({title: entry[21], meal: meal6, price: entry[24], labels: labels6, color: "#4682B4"});
                  }
              }

              // add day to array
              $scope.days.push({date: day, menus: menus});
            })
      }).error(function(data, status) {
          // connection failed
          $scope.showError = true;
      }).finally(function() {
          // refresh successful
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
      });
  };

  // load all menus
  $scope.mensaRefresh();

  /**
   * opens Menu weekview in native browser
   */
  $scope.openWeekview = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() +1; //January is 0!
      var yyyy = today.getFullYear();

      if(storageSrv.get("lang") == "de"){
          var url = "https://www.stw-ma.de/Essen+_+Trinken/Men%C3%BCpl%C3%A4ne/Mensa+am+Schloss-date-" + yyyy + "_" + mm + "_" + dd + "-pdfView-1-showLang-.html";
          window.open(url, "_system", "resizable=yes", "location=yes");
      }
      else{
          var url = "https://www.stw-ma.de/International/Menu/Mensa+am+Schloss-date-" + yyyy + "_" + mm + "_" + dd + "-pdfView-1-showLang-en.html";
          window.open(url, "_system", "resizable=yes", "location=yes");
      }
  };

  $scope.items = ['Additives'];

  /**
   * Opens additives part
   * @param group
   */
   $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
      } else {
          $scope.shownGroup = group;
      }

      $ionicScrollDelegate.scrollBottom();
    };

  /**
   * Checks if additives part is opened or not
   * @param group
   * @returns {boolean}
   */
  $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
  };

  /**
   * Select next day
   */
  $scope.nextDay = function(){
    if($scope.i == 4){
      $scope.i = 0;
    }
    else{
      $scope.i = $scope.i + 1;
    }
  };

  /**
   * Select previous day
   */
  $scope.prevDay = function(){
    if($scope.i == 0){
      $scope.i = 4;
    }
    else{
      $scope.i = $scope.i - 1;
    }
  };

  /**
   * Opens Studierendenwerk website
   */
  $scope.openSTW = function(){
    var url = "https://www.stw-ma.de";
    window.open(url, '_system', 'resizable=yes', 'location=yes');
  }
}]);
