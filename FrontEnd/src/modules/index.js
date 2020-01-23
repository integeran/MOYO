import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyBoard from './accompanyBoard';

const rootReducer = combineReducers({
  accompanyCondition,
  accompanyBoard,
});

export default rootReducer;
