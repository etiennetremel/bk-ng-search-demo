'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('E2E main', function () {
  beforeEach(function () {
    browser.get('index.html');
  });

  it('should have a searching function working', function () {
    element(by.model('query')).sendKeys('Moscow');

    var elems = element(by.repeater('city in cityGroup').row(0));
    expect(elems.getText()).toBe('Moscow (12)');

    element(by.id('clear-button')).click();
    expect(element(by.model('query')).getText()).toBe('');
  });

  it('should display organized results', function () {
    element(by.id('order-asc')).click();
    expect(element(by.repeater('city in cityGroup').row(0)).getText()).toBe('Amsterdam (25)');

    element(by.id('order-desc')).click();
    expect(element(by.repeater('city in cityGroup').row(0)).getText()).toBe('Zagreb (27)');

    element(by.model('sort')).element(by.css('option:last-child')).click();

    expect(element(by.repeater('city in cityGroup').row(0)).getText()).toBe('Singapore (30)');

    element(by.model('sort')).element(by.css('option:first-child')).click();
    expect(element(by.repeater('city in cityGroup').row(0)).getText()).toBe('Zagreb (27)');
  });

  it('should display country details', function () {
    element(by.repeater('city in cityGroup').row(0)).click().then(function () {
    expect(element(by.id('details-title')).getText()).toBe('Amsterdam 25 hotels');
    expect(element(by.id('details-content')).getText()).toMatch(/Amsterdam is the capital/);
    });
  });
});
