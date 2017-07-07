/**
 * @author Lena Burger
 * @version 1.0
 *
 * @uses organizationsSrv
 * @uses storageSrv
 */

app.controller('organizationsCtrl', ['$scope', '$stateParams', '$ionicLoading', 'organizationsSrv', 'storageSrv', function($scope, $stateParams, $ionicLoading, organizationsSrv, storageSrv, $ionicScrollDelegate) {
    $scope.organizations = [];

    // path to the organizations' logos images,
    // i.e., path to the folder "img" in folder "REST" on server
    var serverImg = server.substring(0, server.indexOf("server.php")) + "img/organization_logos/";

    if (typeof $stateParams.id == "undefined") {
        /**
         * Gets all organizations from organizations service
         */
        $scope.getOrganizations = function() {
            $scope.showError = false;
            $ionicLoading.show();
            organizationsSrv.getOrganizationsList(storageSrv.get("uuid")).success(function(response) {
                $scope.organizations = [];
                $scope.organizations = response;
                /**
                 * Controls scroll view
                 */
                $scope.scrollTop = function() {
                $ionicScrollDelegate.scrollTop();
                };

                $scope.search = {name : ""};
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
        // get all organizations
        $scope.getOrganizations();

    } else {
        // load organization details
        organizationsSrv.getOrganizationDetails(storageSrv.get("uuid"), $stateParams.id.replace(':', '')).success(function(response) {
            $scope.organization = response
            $scope.img = serverImg + response.img;
        });
    }
    /**
     * Ensures that only items with available information are displayed
     * @param input
     */
    $scope.isAvailable = function(input) {
        if (input != "")
            return true;
    };
    /**
     * Opens the website of an organization in native browser
     * @param website
     */
    $scope.openWebsite = function(website) {
        window.open(website, '_system', 'resizable=yes', 'location=yes');
        return false;
    };
    /**
     * Opens the facebook site of an organization in native browser
     * @param input
     */
    $scope.openFacebook = function(facebook) {
        window.open(facebook, '_system', 'resizable=yes', 'location=yes');
        return false;
    };


// facebook-feed implementation - not finished or tested
/*    function makeHttpRequest() {
        try {return new XMLHttpRequest();}
        catch (error) {}

        try {return new ActiveXObject("Msxml2.XMLHTTP");}
        catch (error) {}

        try {return new ActiveXObject("Microsoft.XMLHTTP");}
        catch (error) {}

        throw new Error ("could not create HTTP request.");
    }

    var appID = "1560961997522130"; //TESTING
    var appSecret = "d5cc05fc19e121309acd33819602d770"; //TESTING

    var accessTokenRq = makeHttpRequest();
    var httpString = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id='+appID+'&client_secret='+appSecret;

    accessTokenRq.open("GET",httpString,true);
    accessTokenRq.send(null);

    var access_token;

    accessTokenRq.onreadystatechange = function() {
        if (accessTokenRq.readyState == 4) {
            access_token = accessTokenRq.responseText;
            // alert("Hat geklappt :)");

            var request = makeHttpRequest();
            request.open("GET","https://graph.facebook.com/v2.2/288455837835378/posts?"+access_token,true);
            request.send(null);

            request.onreadystatechange = function() {
                if (request.readyState == 4) {

                    var response = request.responseText;
                    //console.log(response);

                    var fbData = angular.fromJson(response);
                    var data = fbData.data;
                    var messageArray = [];
                    var pictureArray = [];
                    var likeArray = [];
                    var dateArray = [];
                    var linkArray = [];
                    var typeArray = [];
                    var commentArray = [];
                    var objects = [];

                    for (var i = 0; i < data.length; i++) {
                        var entry = data[i];

                        // Message
                        if (entry.message) {
                            var message = entry.message;
                            messageArray.push(message);
                        } else {messageArray.push(" ");}

                        // Picture
                        if(angular.equals(entry.type,"photo")) {
                            var pic = "https://graph.facebook.com/"+entry.object_id+"/picture?type=normal";
                            pictureArray.push(pic);
                        } else if (angular.equals(entry.type,"link")) {
                            pictureArray.push(entry.picture);
                        } else {pictureArray.push("empty");}

                        // Likes
                        if (entry.likes) {
                            var likeData = entry.likes;
                            likeArray.push(likeData.data.length+" 'Gefällt mir' Angaben");
                        } else {likeArray.push("0 'Gefällt mir' Angaben");}

                        // Date
                        var created = entry.created_time;
                        var rawDate = created.split("T");
                        var date = rawDate[0];

                        var rawTime = rawDate[1];
                        var time = rawTime.split(":");
                        var betaTime = time[0]+":"+time[1];
                        var finalTime = addOneHour(betaTime);
                        dateArray.push(date+" - "+finalTime);

                        function addOneHour(time) {
                            var seperatedTime = time.split(":");
                            var hourTime = seperatedTime[0];
                            var returningTime = "";
                            if (seperatedTime.indexOf("00") > -1) {returningTime = "01";}
                            if (seperatedTime.indexOf("01") > -1) {returningTime = "02";}
                            if (seperatedTime.indexOf("02") > -1) {returningTime = "03";}
                            if (seperatedTime.indexOf("03") > -1) {returningTime = "04";}
                            if (seperatedTime.indexOf("04") > -1) {returningTime = "05";}
                            if (seperatedTime.indexOf("05") > -1) {returningTime = "06";}
                            if (seperatedTime.indexOf("06") > -1) {returningTime = "07";}
                            if (seperatedTime.indexOf("07") > -1) {returningTime = "08";}
                            if (seperatedTime.indexOf("08") > -1) {returningTime = "09";}
                            if (seperatedTime.indexOf("09") > -1) {returningTime = "10";}
                            if (seperatedTime.indexOf("10") > -1) {returningTime = "11";}
                            if (seperatedTime.indexOf("11") > -1) {returningTime = "12";}
                            if (seperatedTime.indexOf("12") > -1) {returningTime = "13";}
                            if (seperatedTime.indexOf("13") > -1) {returningTime = "14";}
                            if (seperatedTime.indexOf("14") > -1) {returningTime = "15";}
                            if (seperatedTime.indexOf("15") > -1) {returningTime = "16";}
                            if (seperatedTime.indexOf("16") > -1) {returningTime = "17";}
                            if (seperatedTime.indexOf("17") > -1) {returningTime = "18";}
                            if (seperatedTime.indexOf("18") > -1) {returningTime = "19";}
                            if (seperatedTime.indexOf("19") > -1) {returningTime = "20";}
                            if (seperatedTime.indexOf("20") > -1) {returningTime = "21";}
                            if (seperatedTime.indexOf("21") > -1) {returningTime = "22";}
                            if (seperatedTime.indexOf("22") > -1) {returningTime = "23";}
                            if (seperatedTime.indexOf("23") > -1) {returningTime = "00";}

                            //console.log(returningTime+":"+seperatedTime[1]);

                            return returningTime+":"+seperatedTime[1];
                        }

                        //Link
                        if (entry.link) {linkArray.push(entry.link);}
                        else {linkArray.push("empty");}

                        //Comments
                        if (entry.comments) {
                            var commentData = entry.comments;
                            commentArray.push(commentData.data.length);
                        } else {
                            commentArray.push("0 Kommentare");
                        }
                        typeArray.push(entry.type);
                    }

                    for (var i = 0; i < dateArray.length; i++) {

                        // Just a text
                        if ( (angular.equals(linkArray[i],"empty")) && (angular.equals(pictureArray[i],"empty")) ) {
                            objects.push('<div class="list card"><div class="item item-avatar"> <img src="img/appwieseLogo.jpg"><h2>Appwiese</h2> <p>'+dateArray[i]+'</p></div><div class="item item-body"><p>'+messageArray[i]+'</p> <p><span class="subdued">'+likeArray[i]+'</span>  <span class="subdued">'+commentArray[i]+'</span></p></div></div>');

                        }
                        // No link but picture available
                        else if ( (angular.equals(linkArray[i],"empty")) && (angular.equals(pictureArray[i],"empty")) == false ) {
                            objects.push('<div class="list card"><div class="item item-avatar"> <img src="img/appwieseLogo.jpg"><h2>Appwiese</h2> <p>'+dateArray[i]+'</p></div><div class="item item-body"><img src="'+pictureArray[i]+'" width=100%></img> <p>'+messageArray[i]+'</p> <p><span class="subdued">'+likeArray[i]+'</span>  <span class="subdued">'+commentArray[i]+'</span></p></div></div>');
                        }
                        // the rest
                        else {
                            objects.push('<div class="list card"><div class="item item-avatar"> <img src="img/appwieseLogo.jpg"><h2>Appwiese</h2> <p>'+dateArray[i]+'</p></div><div class="item item-body"><a href='+linkArray[i]+' ><img src="'+pictureArray[i]+'" width=100%></img></a> <p>'+messageArray[i]+'</p> <p><span class="subdued">'+likeArray[i]+'</span>  <span class="subdued">'+commentArray[i]+'</span></p></div></div>');
                        }
                    }
                    $scope.entries = objects;
                }
            }
        }
    }*/
}])
