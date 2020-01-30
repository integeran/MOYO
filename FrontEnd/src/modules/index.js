import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';
import morePlanTravel from './morePlanTravel';
import morePlanCompanion from './morePlanCompanion';
import morePlanMemo from './morePlanMemo';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyBoard,
  accompanyFilter,
  planDate,
  morePlanTravel,
  morePlanCompanion,
  morePlanMemo,
});

export default rootReducer;
