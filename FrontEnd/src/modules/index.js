import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';
import morePlanTravel from './morePlanTravel';
import Dm from './Dm';
import morePlanCompanion from './morePlanCompanion';
import morePlanMemo from './morePlanMemo';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  planDate,
  morePlanTravel,
  Dm,
  morePlanCompanion,
  morePlanMemo,
});

export default rootReducer;
