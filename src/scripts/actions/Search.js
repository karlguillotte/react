import Dispatcher from '../Dispatcher';
import Constants from '../constants/Search';

export default {
	setTerm(term) {
		Dispatcher.dispatch({
			type: Constants.SET_TERM,
			term: term
		});
	},
	resetTerm() {
		Dispatcher.dispatch({
			type: Constants.RESET_TERM
		});
	},
	selectItem(item) {
		Dispatcher.dispatch({
			type: Constants.SELECT_ITEM,
			item: item
		});		
	}
};