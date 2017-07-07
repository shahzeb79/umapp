/**
 * @author Shahzeb Khan, Lena Burger
 * @version 1.0
 *
 * @uses contactSrv
 * @uses storageSrv
 */
app.controller('contactsCtrl', ['$scope', '$ionicLoading', 'settingsSrv', 'contactSrv', 'storageSrv', function($scope, $ionicLoading, settingsSrv, contactSrv, storageSrv, $http, $ionicScrollDelegate, filterFilter, $location, $anchorScroll) {


     /**
         *
         * Refreshes contact list
         */
    $scope.contactsRefresh = function() {
        $scope.showError = false;

        $ionicLoading.show();
         /**
         * Loads language from settings
         *
         * @param device uuid
         */
        settingsSrv.get(storageSrv.get("uuid")).success(function(response) {
            $scope.settings = response;
            $scope.lang = $scope.settings.language;
        });

        /**
         * Loads contacts from service
         *
         * @param device uuid
         */
        contactSrv.getcontact(storageSrv.get("uuid")).success(function(contact) {
            for(var q=0;q<contact.length;q++){
                if ($scope.lang == "en"){
                    contact[q].last_name = contact[q].last_name_en;
                    contact[q].faculty = contact[q].faculty_en;
                    contact[q].department = contact[q].department_en;
                    contact[q].address = contact[q].address_en;
                    contact[q].office_hours = contact[q].office_hours_en;
                }
                contact[q].website = contact[q].website.split("/").join(")");
            }
            /**
             * Sorts contacts alphabetically
             * @param a
             * @param b
             */
            $scope.contacts = contact.sort(function(a, b){
                if(a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1;
                if(a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1;
                return 0;
            });

            $scope.getItemHeight = function(item) {
                return item.isLetter ? 40 : 100;
            };
            /**
             * Controls scroll view
             */
            $scope.scrollTop = function() {
                $ionicScrollDelegate.scrollTop();
            };
            /**
             * Controls scroll view
             */
            $scope.scrollBottom = function() {
                $ionicScrollDelegate.scrollBottom();
            };

            $scope.search = {last_name : ""};
            /**
             * Clears the search input string
             */
            $scope.clearSearch = function() {
                $scope.search = '';
            };


        }).error(function(data, status) {
            $scope.showError = true;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        });

    };
    $scope.contactsRefresh();
}]);

