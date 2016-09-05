'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            var promotions = [
            {
                    _id:0,
                    name:'Weekend Grand Buffet', 
                    image: 'images/buffet.png',
                    label:'New',
                    price:'19.99',
                    description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
            }
              
        ];
  
  /*        this.dishes = function(){
              return $http.get(baseURL+"dishes");
          };

          this.getDish = function (index) {
              return $http.get(baseURL+"dishes/"+index);
          };
          
          this.getPromotion = function(index){
              return $http.get(baseURL+"promotions/"+index);
          };
*/
          this.getDishes = function(){
              return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
          };
          this.getPromotion  = function(){
              return $resource(baseURL+"promotions/:id", null, {'update':{'method':'PUT'}  }).query();
          };



      }])

      .factory('corporateFactory', ['$http', 'baseURL', function($http,baseURL) {
    
            var corpfac = {};

          corpfac.getLeaders = function(){
              return $http.get(baseURL+"leadership/");
          };

          corpfac.getLeader = function(index){
              return $http.get(baseURL+"leadership/"+index);
          };

          return corpfac;

        }])
;