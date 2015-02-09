'use strict';

describe('TrailElevation', function () {
  var React = require('react/addons');
  var TrailElevation, component;

  beforeEach(function () {
    TrailElevation = require('../../../src/scripts/components/TrailElevation.js');
    component = React.createElement(TrailElevation);
  });

  it('should create a new instance of TrailElevation', function () {
    expect(component).toBeDefined();
  });
});
