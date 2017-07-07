/**
 * @author Natalie Buchner
 * @version 1.0
 */

app.service('feedbackSrv', function($http){
	return {
        /**
         * Requests active Questions from backend
         * @param uuid - to get user language
         * @returns {*}
         */
        getActiveQuestions:function(uuid){
            return $http({url: server, method: "POST", data:{"module": "feedback", "action": "getActiveQuestions", "uuid": uuid}});
        },

        /**
         * Saves user feedback to backend
         * @param uuid
         * @param feedbackAnswers
         * @param replyTo
         * @returns {*}
         */
        saveFeedback: function(feedbackAnswers, replyTo, uuid) {
            return $http({url: server, method: "POST", data:{"module" : "feedback", "action":"setFeedbackAnswers", "uuid" : uuid, "feedbackAnswers" : feedbackAnswers, "replyTo" : replyTo}});
        }
    }
})