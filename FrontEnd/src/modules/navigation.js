import { createAction, handleActions } from 'redux-actions';

const NAV_CHANGE = 'nav/NAV_CHANGE';

export const navigationState = createAction(NAV_CHANGE, select => select);

const initialState = {
  select: 'accompany',
};

const navigation = handleActions(
  {
    [NAV_CHANGE]: (state, { payload: select }) => ({
      select,
    }),
  },
  initialState,
);

export default navigation;
