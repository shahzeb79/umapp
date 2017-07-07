/**
 * @author Tobias Nisius
 * @version 1.0
 *
 * @uses newsSrv
 * @uses storageSrv
 */

app.controller('newsCtrl', ['$scope', '$stateParams', '$location', '$ionicScrollDelegate', '$ionicLoading','newsSrv', 'storageSrv', function($scope, $stateParams, $location, $ionicScrollDelegate, $ionicLoading, newsSrv, storageSrv, $state) {

    $scope.groups = ['Filter'];
    $scope.showFilter = false;

    // Assign the right filters according to device language
    if(storageSrv.get("lang") == "de") {
        $scope.nfiltersAll = ["BWL", "Jura", "Universität", "Philosophie", "Rechenzentrum", "Sozialwissenschaften", "WIM"];
    }
    else {
        $scope.nfiltersAll = ["Economics", "University"];
    }

    /**
     * Toggles the filter
     */
    $scope.toggle = function() {
        if($scope.showFilter == true) {
            $scope.showFilter = false;
        }
        else {
            $scope.showFilter = true;
        }
    };

    /**
     * Compares two objects by length
     * @param first
     * @param second
     * @returns {boolean}
     */
    $scope.compare = function(first, second){
        if(Object.keys(second).length == 0) {
            return true;
        }
        return (Object.keys(first).length == Object.keys(second).length);
    }

    /**
     * Custom filter for ng-repeat over news
     * @param news
     * @returns {boolean}
     */
    $scope.filterNews = function(news) {
        if(Object.getOwnPropertyNames($scope.nfilters).length === 0 || $scope.nfilters == "") {
            return true;
        }
        return ($scope.nfilters.indexOf(news.category) != -1);
    };

    /**
     * Checks if filter has been toggled
     * @param filter
     * @return {boolean}
     */
    $scope.isToggle = function(filter) {
        if($scope.nfilters.constructor === Array) {
            if ($scope.nfilters.indexOf(filter) > -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * Toggle ability for a group
     * @param group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };

    /**
     * Checks if group has been toggled
     * @param  group
     * @return {boolean}
     */
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.news = [];
    $scope.newsFilterEntries = storageSrv.getObject("newsFilter");
    $scope.newsExtendCount = 0;
    $scope.filter_used = storageSrv.getObject("newsFilter");

    /**
     * Decodes BBCode to html
     * @param entry
     * @return {string}
     */
    $scope.decodeBBCode = function(entry) {

        for (var key in entry) {
            entry[key] = entry[key].replace(/\[BR\]/g, '<br />');
            entry[key] = entry[key].replace(/\[P\](.+?)\[\/P\]/g, '<p>$1</p>');
            entry[key] = entry[key].replace(/\[B\](.+?)\[\/B\]/g, '<b>$1</b>');
            entry[key] = entry[key].replace(/\[URL=(.+?)\](.+?)\[\/URL\]/g, '<a href="$1">$2</a>');
            entry[key] = entry[key].replace(/\[IMG=(.+?)\](.+?)\[\/IMG\]/g, '<img src="$1" title="$2" />');
        }

        return entry;
    };

    if (typeof $stateParams.id == "undefined") {

        /**
         * Ability to refresh the news
         */
        $scope.newsRefresh = function() {
            
          $ionicLoading.show();
          $scope.showError = false;

          var myarr = [];
            newsSrv.getNewsList(storageSrv.get("uuid")).success(function(response) {
                for (var q = 0; q < response.length; q++) {
                    myarr[q] = response[q].category;

                }

                var noDupes = ArrNoDupe(myarr);
                $scope.news = [];
                $scope.newsExtendCount = 0;
                response.forEach(function(entry) {

                    $scope.news.push($scope.decodeBBCode(entry));

                });
            }).error(function(data, status) {
                // connection failed
                $scope.showError = true;
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        // load news list
        $scope.newsRefresh();

        /**
         * Ability to load aditional content on scrolldown
         */
        $scope.newsExtend = function() {
            $scope.newsExtendCount++;
            newsSrv.getNewsList(storageSrv.get("uuid"), $scope.newsExtendCount).success(function(response) {
                response.forEach(function(entry) {
                    $scope.news.push($scope.decodeBBCode(entry));
                });
            }).error(function(data, status) {
                $scope.showstartCard1 = false;
                $scope.showstartCard = true;
                $scope.Error = "Error Connecting server";
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        /**
         * Filters news and saves the choice in the local storage
         * @param filter
         */
        $scope.newsFilter = function(filter) {
            var filters = Array.from(storageSrv.getObject("newsFilter"));
            if(filters.indexOf(filter) > -1) {
                filters.splice(filters.indexOf(filter), 1);
            }
            else {
                filters.push(filter);
            }
            storageSrv.setObject("newsFilter", filters);
            $scope.nfilters = filters;
        };

        /**
         * Removes duplicates within array
         * @param a
         * @returns {Array}
         */
        function ArrNoDupe(a) {
            var temp = {};
            for (var i = 0; i < a.length; i++)
                temp[a[i]] = true;
            var r = [];
            for (var k in temp)
                r.push(k);
            return r;
        }

        /**
         * Redirect to news detail page
         * @param id
         */
        $scope.showNewsDetail = function(id) {
            $location.path('app/news/:' + id);
        };

        $scope.nfilters = Array.from(storageSrv.getObject("newsFilter"));

        // if filter not altered, yet, assign all filter options to it
        if($scope.nfilters.length == 0) {
            $scope.nfilters = $scope.nfiltersAll;
            storageSrv.setObject("newsFilter", $scope.nfiltersAll);
        }

    } else {
        // load news details
        newsSrv.getNewsDetail(storageSrv.get("uuid"), $stateParams.id.replace(':', '')).success(function(response) {
            $scope.news = $scope.decodeBBCode(response)
        });
    }

}])
