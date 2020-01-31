import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const GET_SCHEDULE = 'morePlanTravel/GET_SCHEDULE';

export const storeSchedule = createAction(
  GET_SCHEDULE,
  planTravelList => planTravelList,
);

const initialState = {
  planTravelList: [
    // {
    //   cid: '',
    //   city: '',
    //   nid: '',
    //   nation: '',
    //   startDate: '',
    //   endDate: '',
    // },
  ],
};

const morePlanTravel = handleActions(
  {
    [GET_SCHEDULE]: (state, action) => ({
      ...state,
      planTravelList: action.payload,
    }),
  },
  initialState,
);

export default morePlanTravel;
