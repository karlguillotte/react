'use strict';

describe('Search', function () {
  var React = require('react/addons');
  var Search, component;

  beforeEach(function () {
    Search = require('../../../src/scripts/components/Search.js');
    component = React.createElement(Search);
  });

  it('should create a new instance of Search', function () {
    expect(component).toBeDefined();
  });
});
