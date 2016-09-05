'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

            

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.myfeedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    
                    console.log($scope.feedback);

                    feedbackFactory.setFeedback().save($scope.feedback);
                    
                    $scope.feedbackForm.$setPristine();
                    
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                   function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                        function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );            
            }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                $scope.mycomment.comment = $scope.userComment.comment;
                $scope.mycomment.author = $scope.userComment.author;
                $scope.mycomment.rating = $scope.userComment.rating;
                console.log($scope.userComment);
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            $scope.promo = {};
            $scope.showPromo = false;
            $scope.messagePromo="Loading ...";
            $scope.promo = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promo = response;
                    $scope.showPromo = true;
                },
                function(response) {
                    $scope.messagePromo = "Error: "+response.status + " " + response.statusText;
                }
            );

            
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );


            $scope.leader = {};
            $scope.showLeader = false;
            $scope.messageLeader="Loading ...";

            $scope.leader = corporateFactory.getLeaders().get({id:0})
            .$promise.then(
                function(response){
                    console.log(response);
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.messageLeader = "Error: "+response.status + " " + response.statusText;
                }
            );

        }])
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            $scope.leaders = {};
            $scope.showLeaders = false;
            $scope.messageLeaders="Loading ...";

            corporateFactory.getLeaders().query(
                function(response){
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.messageLeaders = "Error: "+response.status + " " + response.statusText;
                }
            );


        }]);
