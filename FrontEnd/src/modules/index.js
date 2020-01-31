import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';
import morePlanTravel from './morePlanTravel';
import Dm from './Dm';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyBoard,
  accompanyFilter,
  planDate,
  morePlanTravel,
  Dm,
});

export default rootReducer;
