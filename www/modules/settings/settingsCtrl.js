/**
 * @author Tobias Nisius
 * @version 1.0
 *
 * @uses settingsSrv
 * @uses storageSrv
 */

app.controller('settingsCtrl', ['$scope', '$translate', '$ionicHistory', 'settingsSrv', 'storageSrv', function($scope, $translateProvider, $ionicHistory, settingsSrv, storageSrv) {

    $scope.settings = "";

    settingsSrv.get(storageSrv.get("uuid")).success(function(response) {
        $scope.settings = response;

        // update local storage if values differ
        if($scope.settings.language != $translateProvider.use()) {
            $scope.settings = {"language": $translateProvider.use()};
            settingsSrv.set(storageSrv.get("uuid"), "language", $scope.settings.language);
            storageSrv.set("lang", $scope.settings.language);
        }

        // toggles must be boolean and not a string
        if ($scope.settings.pushNotifications == "true") {
            $scope.settings.pushNotifications = true
        }
        if ($scope.settings.language == "de") {
            $scope.settings.language = true
        }
        if ($scope.settings.widget == "true") {
            $scope.settings.widget = true
        }
    });

    /**
     * Clears the ionic history, cache and in case of language switches translation file
     * In case more languages shall be implemented, change toggle to dropdown, pass the value as param and edit if statement
     * Language files: lang/de.json; lang/en.json (add your new language .json here - caution: files must be identical)
     * @param key
     */
    $scope.setSettings = function(key) {
        if (key == "language") {

            if ($scope.settings[key] == true) {
                $scope.settings[key] = "de";
            } else {
                $scope.settings[key] = "en";
            }

            $translateProvider.use($scope.settings[key]);
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            storageSrv.set("lang", $scope.settings[key]);
            storageSrv.setObject("newsFilter", "");
        }
        if (key == "pushNotifications") {

            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();

        }
        if (key == "widget") {

            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();

        }

        // save to local storage and adjust to boolean because toggle can't handle strings
        settingsSrv.set(storageSrv.get("uuid"), key, $scope.settings[key]);
        if ($scope.settings.language == "de") {
            $scope.settings.language = true
        }
    }
}]);