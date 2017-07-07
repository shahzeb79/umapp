/**
 * @author Shahzeb Khan, Lena Burger
 * @version 1.0
 *
 * @uses contactSrv
 * Handles details for each contact
 */
app.controller('contactsDetailCtrl', ['$scope','settingsSrv','storageSrv','$stateParams', function($scope,settingsSrv,storageSrv, $stateParams) {

    var parameter = $stateParams.title;
    var fields = parameter.split(/~/);

    $scope.title = fields[0];
    $scope.lastname = fields[1];
    
    if (fields[2].indexOf(",") != -1) //returns "-1" if no comma in String
    {
        //only take string before comma as first name
        $scope.firstname = fields[2].substring(fields[2].indexOf(",") + 1);
    } 
    else 
    {
        $scope.firstname = fields[2];
    }
  
    $scope.faculty = fields[3];
    $scope.department = fields[4];
    $scope.address = fields[5];
    $scope.phone_sec = fields[6];
    $scope.office_hours = fields[7];
    $scope.room = fields[8].replace("*", ""); 
    $scope.website = fields[9].split(")").join("/");

    /**
     * Ensures that only items with available information are displayed
     * @ param input 
     */
    $scope.isAvailable = function(input) {
        if (input == null || input == "")
            return false;
        else
            return true;
    };

    /** 
     * Opens the website of an organization in native browser
     * @ param website 
     */
    $scope.openWebsite = function(website) {
        window.open(website, '_system', 'resizable=yes', 'location=yes');
        return false;
    };

}])