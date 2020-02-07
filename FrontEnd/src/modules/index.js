import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';
import morePlanTravel from './morePlanTravel';
import Dm from './Dm';
import morePlanCompanion from './morePlanCompanion';
import morePlanMemo from './morePlanMemo';
import postmap from './postmap';
import navigation from './navigation';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyFilter,
  planDate,
  morePlanTravel,
  Dm,
  morePlanCompanion,
  morePlanMemo,
  postmap,
  navigation,
});

export default rootReducer;
