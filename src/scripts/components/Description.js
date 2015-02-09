import React from 'react/addons';
import '../../styles/Description.less';

var PropTypes = React.PropTypes;
var regexp = /\[L=http:\/\/www.trailforks.com\/([\s\S]*?)[*\/]\]([\s\S]*?)\[\/L\]/g;
var description = function({description,type,title}) {
	if (!description) {
		description = `No description available for this ${type} ${title}.`;
	} else {
		description = description.replace(regexp, '<a href="#/$1">$2</a>');
	}

	return <p dangerouslySetInnerHTML={{ __html: description }} />;
}
var accessInfo = function({accessInfo}) {
	if (!accessInfo) {
		return null;
	}
	
	accessInfo = accessInfo.replace(regexp, '<a href="#/$1">$2</a>');

	return <p dangerouslySetInnerHTML={{ __html: accessInfo }} />;
}

export default React.createClass({
	propTypes: {
		feature: PropTypes.object.isRequired
	},
	render() {
		var {feature} = this.props;
		
		return (
      		<div className="Description">
      			{description(feature)}
      			{accessInfo(feature)}
      		</div>
		);
	}
});
