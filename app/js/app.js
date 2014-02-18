'use strict';

var myApp = angular.module('myApp', ['ngSanitize'])

  .constant('jsonFile', 'data/cities.json')

  .controller('AppCtrl', ['$scope', '$http', 'jsonFile',
    function($scope, $http, jsonFile) {
      // Define default scope variables
      $scope.loading = true;
      $scope.sort = 'name';
      $scope.order = 'false';

      // Fetch data
      $http.get(jsonFile)
        .success(function(data, status, headers, config) {
          $scope.cities = data;
          $scope.loading = false;
        })
        .error(function(data) {
          console.error('Error fetching datas:', data);
        });

      // Actions
      $scope.clearField = function () {
        $scope.query = '';
      };

      $scope.view = function (city) {
        $scope.cityDetails = city;
      };
    }
  ])

  // Add columns to ng-repeat
  .filter('columns', ['$cacheFactory',
    function ($cacheFactory) {
      var cache = $cacheFactory('columns');
      return function(array, columns) {
        if (array) {
          var filteredArray = [],
              perColumn = Math.ceil(array.length / columns);

          for (var i = 0; i < columns; i++) {
            filteredArray.push(array.slice(i * perColumn, i * perColumn + perColumn));
          }
          var json = JSON.stringify(array),
              cachedArray = cache.get(json + columns);

          if (JSON.stringify(cachedArray) === JSON.stringify(filteredArray)) {
            return cachedArray;
          }
          cache.put(json + columns, filteredArray);
          return filteredArray;
        }
      }
    }]);