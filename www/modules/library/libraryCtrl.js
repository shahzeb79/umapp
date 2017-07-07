/**
 * @author Lukas Hannappel
 * @version 1.0
 *
 * @uses storageSrv
 */
app.controller('libraryCtrl', ['$scope', 'storageSrv', '$cordovaBarcodeScanner', '$ionicPopup', function($scope, storageSrv, $cordovaBarcodeScanner, $ionicPopup) {
  /**
   * Opens library website in native browser
   */
  $scope.openWebsite = function() {
      var url = "http://www.bib.uni-mannheim.de/mobile/" + storageSrv.get("lang") + "/1.html";
      window.open(url, '_system', 'resizable=yes', 'location=yes');
  };

  /**
   * Opens Primo in native browser
   */
  $scope.openPrimo = function() {
      var url = "http://primo.bib.uni-mannheim.de/primo_library/libweb/action/search.do?vid=MAN_MOBILE&reset_config=true";
      window.open(url, '_system', 'resizable=yes', 'location=yes');
  };

  /**
   * Opens ISBN scanner
   */
  $scope.scanISBN = function() {
      /**
       * Starts barcode scanner
       */
      $cordovaBarcodeScanner.scan().then(function(barcodeData) {
          // scan successful
          if (!barcodeData.cancelled) {
              var text = barcodeData.text;

              // check if scanned barcode is an ISBN
              if (text.substring(0, 3) == '978' || text.substring(0, 3) == '979') {
                  // yes, barcode is an ISBN, open primo in native browser and search the book
                  var url = "http://primo.bib.uni-mannheim.de/primo_library/libweb/action/dlSearch.do?lang=ger&onCampus=false&institution=MAN&vid=MAN_MOBILE&search_scope=MAN_ALEPH&query=isbn,exact," + barcodeData.text;
                  window.open(url, '_system', 'resizable=yes', 'location=yes');
              } else {
                  // no, barcode is no ISBN, show error message
                  if (storageSrv.get("lang") == 'de') {
                      $ionicPopup.alert({
                          title: 'Hinweis',
                          template: 'Dies ist kein gültiger ISBN Barcode!'
                      });
                  } else {
                      $ionicPopup.alert({
                          title: 'Please note',
                          template: 'This is no valid ISBN Barcode!'
                      });
                  }
              }
          }
      }, function(error) {
          // scan not successful
          alert(JSON.stringify(error));
      });
  };

  /**
   * Opens opening times in native browser
   */
  $scope.openTime = function() {
      var url = "http://www.bib.uni-mannheim.de/mobile/" + storageSrv.get("lang") + "/88.html?&L=0,";
      window.open(url, '_system', 'resizable=yes', 'location=yes');
  };
}]);
