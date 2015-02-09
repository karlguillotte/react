'use strict';

describe('InfoPanelContents', function () {
  var React = require('react/addons');
  var InfoPanelContents, component;

  beforeEach(function () {
    InfoPanelContents = require('../../../src/scripts/components/InfoPanelContents.js');
    component = React.createElement(InfoPanelContents);
  });

  it('should create a new instance of InfoPanelContents', function () {
    expect(component).toBeDefined();
  });
});
