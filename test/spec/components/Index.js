'use strict';

describe('Index', function () {
  var React = require('react/addons');
  var Index, component;

  beforeEach(function () {
    Index = require('../../../src/scripts/components/Index.js');
    component = React.createElement(Index);
  });

  it('should create a new instance of Index', function () {
    expect(component).toBeDefined();
  });
});
