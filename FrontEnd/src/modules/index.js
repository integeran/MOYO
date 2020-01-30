import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyBoard,
  accompanyFilter,
  planDate,
});

export default rootReducer;
