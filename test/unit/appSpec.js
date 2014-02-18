'use strict';

/* jasmine specs */

describe('AppCtrl', function(){
  beforeEach(module('myApp'));

  var AppCtrl, scope, httpBackend;

  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    AppCtrl = $controller('AppCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;
    httpBackend.when('GET', 'data/cities.json').respond(200);
  }));

  afterEach(function() {
    httpBackend.flush();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch datas', function () {
    httpBackend.expectGET('data/cities.json').respond(200);
  });

  it('should define default scope value', function () {
    expect(scope.sort).toBe('name');
    expect(scope.order).toBe('false');
  });

  it('should clear the query field', function () {
    scope.query = 'something';
    scope.clearField();
    expect(scope.query).toBe('');
  });

  it('should display the right city', function () {
    expect(scope.cityDetails).toBeUndefined();

    var city = {
      name: "Amsterdam",
      slug: "amsterdam",
      count: 25,
      content: "<p>Amsterdam is the capital and most populous city of the <b>Netherlands</b>. Its status as the Dutch capital is mandated by the Constitution of the Netherlands though it is not the seat of the Dutch government, which is at the Hague. </p>"
    };
    scope.view(city);

    expect(scope.cityDetails).toBe(city);
  });

  it('should have a column filter working', inject(function($filter){
    var array = [
      'value 1',
      'value 2',
      'value 3',
      'value 4',
      'value 5'
    ];

    var result = [];
    result.push(['value 1', 'value 2']);
    result.push(['value 3', 'value 4']);
    result.push(['value 5']);

    var filter = $filter('columns')(array, 3);

    expect(filter).toEqual(result);
  }));
});
