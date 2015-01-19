"use strict";

var React = require("react/addons");
var mui = require("material-ui");
var Paper = mui.Paper;


require("../../styles/Search.less");

module.exports = React.createClass({
  render: function () {
    return (
        <div>
			<Paper zDepth={1} rounded={false} />
        </div>
      );
  }
});