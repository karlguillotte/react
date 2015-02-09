import React from 'react/addons';
import '../../styles/Page.less';

export default React.createClass({
  render() {
    return (
        <div className={`Page ${this.props.className}`}>
        	{this.props.children}
        </div>
      );
  }
});
