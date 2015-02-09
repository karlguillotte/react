import Dispatcher from '../Dispatcher';
import Constants from '../constants/Map';

export default {
	changeZoom(zoom) {
		Dispatcher.dispatch({
			type: Constants.CHANGE_ZOOM,
			zoom: zoom
		});
	},
	changeCenter(center) {
		Dispatcher.dispatch({
			type: Constants.CHANGE_CENTER,
			center: center
		});
	},
	changeBounds(bounds) {
		Dispatcher.dispatch({
			type: Constants.CHANGE_BOUNDS,
			bounds: bounds
		});
	},
	selectFeature({feature,target}) {
		Dispatcher.dispatch({
			type: Constants.SELECT_FEATURE,
			feature: feature,
			target: target
		});
	},
	unselectFeature({target}) {
		Dispatcher.dispatch({
			type: Constants.UNSELECT_FEATURE,
			target: target
		});
	},
	fitToFeature(feature) {
		Dispatcher.dispatch({
			type: Constants.FIT_TO_FEATURE,
			feature: feature
		});
	}
};