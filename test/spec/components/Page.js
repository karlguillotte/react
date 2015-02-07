'use strict';

describe('Page', function () {
  var React = require('react/addons');
  var Page, component;

  beforeEach(function () {
    Page = require('../../../src/scripts/components/Page.js');
    component = React.createElement(Page);
  });

  it('should create a new instance of Page', function () {
    expect(component).toBeDefined();
  });
});
