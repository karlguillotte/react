'use strict';

describe('InfoPanel', function () {
  var React = require('react/addons');
  var InfoPanel, component;

  beforeEach(function () {
    InfoPanel = require('../../../src/scripts/components/InfoPanel.js');
    component = React.createElement(InfoPanel);
  });

  it('should create a new instance of InfoPanel', function () {
    expect(component).toBeDefined();
  });
});
