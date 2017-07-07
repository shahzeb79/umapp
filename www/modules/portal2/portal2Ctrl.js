/**
 * @author Tobias Nisius
 * @version 1.0
 *
 * @uses portal2Srv
 * @uses storageSrv
 */

app.controller('portal2Ctrl', ['$scope','$stateParams','$ionicScrollDelegate','$location','$ionicLoading','portal2Srv','storageSrv', function($scope, $stateParams, $ionicScrollDelegate, $location, $ionicLoading, portal2Srv, storageSrv){
	storageSrv.set("portal2Refresh", "false");
	$scope.showPortal2Filter = false;

	/**
	 * Toggles the filter for personal schedule
	 */
	$scope.toggle = function() {
		if($scope.showPortal2Filter == true) {
			$scope.showPortal2Filter = false;
			if (Object.getOwnPropertyNames($scope.filters).length > 1) {
				$ionicScrollDelegate.scrollTop();
			}
		}
		else {
			$scope.showPortal2Filter = true;
			if(!$scope.isGroupShown($scope.schedule[0][0].start)) {
				$scope.toggleGroup($scope.schedule[0][0].start);
			}
		}
	};

	/**
	 * Filters schedule and saves the choice in the local storage
	 * @param filter
	 */
	$scope.portal2Filter = function(filter) {
		var filters = Array.from(storageSrv.getObject("portal2Filter"));
		if(filters.indexOf(filter) > -1) {
			filters.splice(filters.indexOf(filter), 1);
		}
		else {
			filters.push(filter);
		}
		storageSrv.setObject("portal2Filter", filters);
		$scope.filters = filters;
		if($scope.filters.length == 0 && !$scope.isGroupShown($scope.schedule[0][0].start)) {
			$scope.toggleGroup($scope.schedule[0][0].start);
		}
	};

	/**
	 * Custom filter for ng-repeat over groups
	 * @param groups
	 * @returns {boolean}
     */
	$scope.filterGroups = function(groups) {
		if($scope.filters.length === 0 || $scope.showPortal2Filter || $scope.filters == "") {
			return true;
		}
		else {
			for(var i = 0; i < groups.length; i++) {
				if($scope.filters.indexOf(groups[i].eventname) != -1) {
					return true;
				}
			}
			return false;
		}
	};

	/**
	 * Custom filter for ng-repeat over lecture
	 * @param lecture
	 * @returns {boolean}
     */
	$scope.filterLecture = function(lecture) {
		if(Object.getOwnPropertyNames($scope.filters).length === 0 || $scope.showPortal2Filter || $scope.filters == "") {
			return true;
		}
		return ($scope.filters.indexOf(lecture.eventname) != -1);
	};

	/**
	 * Redirect to news detail page
	 * @param id
	 */
	$scope.showPortal2Detail = function(id) {
		$location.path('app/portal2/:' + id);
	};

	/**
	 * Checks if filter has been toggled
	 * @param filter
	 * @return {boolean}
	 */
	$scope.isToggle = function(filter) {
		if($scope.filters.constructor === Array) {
			if ($scope.filters.indexOf(filter) > -1) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Ability to toggle a group
	 * @param group
     */
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroups.splice($scope.shownGroups.indexOf(group));
		} else {
			$scope.shownGroups.push(group);
		}
	};

	/**
	 * Checks if a group is already shown
	 * @param group
	 * @returns {boolean}
     */
	$scope.isGroupShown = function(group) {
		if($scope.shownGroups.indexOf(group) > -1) {
			return true;
		}
		if($scope.showPortal2Filter == false) {
			if(typeof $stateParams.id == "undefined" && $scope.filters.length > 0) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Toggles all groups at once
	 */
	$scope.toggleAllGroups = function() {
		$scope.schedule.forEach(function(entry) {
			if($scope.search.eventname.length > 0) {
				if ($scope.shownGroups.indexOf(entry[0].start) == -1) {
					$scope.shownGroups.push(entry[0].start);
				}
			}
			else {
				$scope.shownGroups = [];
				$scope.toggleGroup($scope.schedule[0][0].start);
			}
		});
	}

	if(typeof $stateParams.id == "undefined") {

		/**
		 * Refreshes all portal2 data
		 * @param date
         */
		$scope.portal2Refresh = function(date) {
			$scope.showError = false;
      $ionicLoading.show();

      portal2Srv.getSchedule(storageSrv.get("uuid"), date, storageSrv.get("lang")).success(function (response) {
				$scope.schedule = response;
				storageSrv.set("portal2Refresh", "false");
				$scope.arrowColor = "#000000";
				$scope.shownGroups = [];

				if($scope.schedule != "") {
					if(!$scope.isGroupShown($scope.schedule[0][0].start)) {
						$scope.toggleGroup($scope.schedule[0][0].start);
					}
				}
			}).error(function(data, status) {
            // connection failed
            $scope.showError = true;
        }).finally(function () {
				$scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
			});
		};

		$scope.today = new Date();

		/**
		 * Calculates the data to refresh the data for and executes the refresh
		 * @param direction
         */
		$scope.getDate = function(direction) {
			if(storageSrv.get("portal2Refresh") != "true") {
				storageSrv.set("portal2Refresh", "true");
				$scope.arrowColor = "#D3D3D3";

				if (direction == "back") {
					$scope.today = new Date($scope.today.getTime() - 24 * 60 * 60 * 1000);
				}
				if (direction == "forward") {
					$scope.today = new Date($scope.today.getTime() + 24 * 60 * 60 * 1000);
				}

				var dd = $scope.today.getDate();
				var mm = $scope.today.getMonth() + 1; //January is 0!
				var yyyy = $scope.today.getFullYear();

				if (dd < 10) {
					dd = '0' + dd;
				}
				if (mm < 10) {
					mm = '0' + mm;
				}

				$scope.date = dd + '.' + mm + '.' + yyyy;
				$scope.portal2Refresh($scope.date);
			}
		};

		$scope.getDate();
		$scope.filters = Array.from(storageSrv.getObject("portal2Filter"));
	}
	else {
		// load schedule details
		portal2Srv.getScheduleDetail(storageSrv.get("uuid"),$stateParams.id.replace(':', ''), storageSrv.get("lang")).success(function(response) {
			$scope.scheduleDetail = response;
		});

		$scope.shownGroups = [];
	}

}])
