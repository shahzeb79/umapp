/**
 * @author Shahzeb Khan
 * @version 1.0
 *
 * @uses radioSrv
 */
app.controller('radioCtrl', function($scope, $cordovaMedia, $http, $timeout, $cordovaNativeAudio, radioSrv, storageSrv) {
    var time = 100000;
    $scope.hidewidget = false;
    $scope.hideCard = function() {

        $scope.hidewidget = true;
    };

    $scope.isSoundLoaded = false;
    $scope.audio = null;
    $scope.media = null;

    $scope.reload = function() {
        
        radioSrv.getradio(storageSrv.get("uuid")).success(function(response) {
            $scope.item = response;
        });


    };

    $scope.playWebAudio = function() {
        time = 10000;
        $scope.reload();
        $timeout(function() {
            $scope.reload();
        }, time)
        $scope.isDisabled = true;

        try {
            $scope.audio = new Audio('http://stream.radioaktiv.org:8233/HiFi');
            $scope.audio.play();
        } catch (e) {
            alert(e);
        }
    }

    $scope.stopWeb = function() {
        $scope.isDisabled = false;
        time = 100000;
        $scope.audio.pause();
        $scope.item = '';
    }


})