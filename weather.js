angular.module('weatherApp', [])

  .controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
    function fetchWeatherData(zipCode) {
        weatherService.getWeatherInfo(zipCode).then(function(data){
          $scope.place = data;
        }); 
      }
    fetchWeatherData('22102');
  }])

  .factory('weatherService', ['$http', '$q', function ($http, $q){
      return {
        getWeatherInfo: getWeatherInfo
      };
      function getWeatherInfo (zipCode) {
        var deferred = $q.defer();
        $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20WHERE%20location%3D%22' + zipCode + '%22&format=json&diagnostics=true&callback=')
          .success(function(data){
            deferred.resolve(data.query.results.channel);
          })
          .error(function(err){
            console.log('Error');
            deferred.reject(err);
          });
        return deferred.promise;
      }
}]);


                