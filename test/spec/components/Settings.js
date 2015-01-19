'use strict';

describe('Settings', function () {
  var React = require('react/addons');
  var Settings, component;

  beforeEach(function () {
    Settings = require('../../../src/scripts/components/Settings.js');
    component = React.createElement(Settings);
  });

  it('should create a new instance of Settings', function () {
    expect(component).toBeDefined();
  });
});
