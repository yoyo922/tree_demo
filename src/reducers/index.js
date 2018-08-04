import { combineReducers } from 'redux';
import ActiveAcc from './reducer_active_account';

const rootReducer = combineReducers({
  activeAcc: ActiveAcc
});

export default rootReducer;
