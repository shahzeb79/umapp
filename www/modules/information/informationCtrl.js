/**
 * @author Elvis Gordella
 * @version 1.0
 *
 * @uses storageSrv
 */

app.controller('informationCtrl', ['$scope', '$sce', 'storageSrv', function($scope, $sce, storageSrv) {

/** 
* Opens the website of University Mannheim Impressum in a native browser 
*/
    $scope.openInfo = function() {
        if (storageSrv.get("lang") == 'de') {
            window.open('http://www.uni-mannheim.de/ionas/uni/1/config/footer/impressum/', '_system', 'resizable=yes', 'location=yes');
            return false;
        } else {
            window.open('http://www.uni-mannheim.de/1/english/config/footer/About%20this%20Site/', '_system', 'resizable=yes', 'location=yes');
            return false;
        }
    };
/** 
* Opens the website of Open-Source Licences in a native browser 
*/
    $scope.openLicenses = function() {
        window.open('http://www.uni-mannheim.de/1/presse_uni_medien/uni_medien/app/Open-Source-Licences/', '_system', 'resizable=yes', 'location=yes');
        return false;
    };
}])