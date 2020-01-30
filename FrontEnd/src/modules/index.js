import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyBoard,
  accompanyFilter,
});

export default rootReducer;
