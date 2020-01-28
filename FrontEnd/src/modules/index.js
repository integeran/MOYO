import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyBoard,
  planDate,
});

export default rootReducer;
