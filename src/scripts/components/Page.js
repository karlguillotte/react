import React from 'react/addons';
import '../../styles/Page.less';

export default React.createClass({
  render: function () {
    return (
        <div className={`Page ${this.props.className}`}>
        	{this.props.children}
        </div>
      );
  }
});
