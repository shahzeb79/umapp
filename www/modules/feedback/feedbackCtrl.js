/**
 * @author Natalie Buchner
 * @version 1.0
 *
 * @uses feedbackSrv
 * @uses storageSrv
 */

app.controller('feedbackCtrl', function($scope, feedbackSrv, $ionicPopup, $ionicLoading, $filter, $state, storageSrv){

    $scope.feedbackSent = false;
    $scope.questions = [];
    $scope.answers   = [];
    $scope.mail   = {
        replyTo :''
        };

    /**
    * Reads current active questions from backend
    */
    $scope.getQuestions = function(){
        $scope.showError = false;
        $ionicLoading.show();

        feedbackSrv.getActiveQuestions(storageSrv.get("uuid")).success(function(response) {
            $scope.questions = []; //reset
            response.forEach(function(entry) {
              $scope.questions.push(entry); //entry consists of: question_id, question_text, question_type
              $scope.answers.push({
                question_id: entry.question_id,
                answer_content: ''
              });
            });
        }).error(function(){
          // connection error
          $scope.showError = true;
        }).finally(function() {
          // refresh completed
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });
    };

    //Initial Load of Questions + later of previous answers?!
    $scope.getQuestions();

    /**
    * Checks if at least one question was answered
    */
    $scope.checkFeedback = function(){
        var answered = false;
        $scope.answers.forEach(function(answer){
            if (answer.answer_content !== "") {
                answered = true;
            }
        });
        return answered;
    };

    /**
    * Saves given feedback (if check successful)
    */
    $scope.saveFeedback = function(){
        if ($scope.checkFeedback()){
            feedbackSrv.saveFeedback($scope.answers, $scope.mail.replyTo, storageSrv.get("uuid")).success(function(data){
                //TODO translation?!
                $scope.feedbackSent = true;
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('FEEDBACK.POPUP_SUCCESS.TITLE'),
                    template: $filter('translate')('FEEDBACK.POPUP_SUCCESS.TEMPLATE')
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('FEEDBACK.POPUP_ERROR.TITLE'),
                template: $filter('translate')('FEEDBACK.POPUP_ERROR.TEMPLATE')
            });
        };
    };
})
