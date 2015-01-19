'use strict';

var React = require('react/addons');
var Map = require("./Map");
var SearchBar = require("./SearchBar");

require('../../styles/Index.less');


var Index = React.createClass({
  render: function () {
    return (
        <div className="Index">
        	<Map />
        	<SearchBar />
        </div>
      );
  }
});

module.exports = Index;


