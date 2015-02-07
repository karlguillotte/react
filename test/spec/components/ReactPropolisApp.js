'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ReactPropolisApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactPropolisApp = require('../../../src/scripts/components/ReactPropolisApp.js');
    component = React.createElement(ReactPropolisApp);
  });

  it('should create a new instance of ReactPropolisApp', function () {
    expect(component).toBeDefined();
  });
});
