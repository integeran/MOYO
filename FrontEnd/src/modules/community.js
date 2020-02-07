import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_TITLE = 'community/CHANGE_TITLE';
const CHANGE_CONTENTS = 'community/CHANGE_CONTENTS';
const SET_CITY = 'community/SET_CITY';
const CHANGE_TYPE = 'community/CHANGE_TYPE';

export const changeTitle = createAction(CHANGE_TITLE, title => title);
export const changeContents = createAction(
  CHANGE_CONTENTS,
  contents => contents,
);
export const setCity = createAction(SET_CITY, cId => cId);
export const changeType = createAction(CHANGE_TYPE, cmTypeId => cmTypeId);

const initialState = {
  title: '',
  contents: '',
  cId: 1,
  cmTypeId: 1,
};

const community = handleActions(
  {
    [CHANGE_TITLE]: (state, { payload: title }) =>
      produce(state, draft => {
        draft.title = title;
      }),
    [CHANGE_CONTENTS]: (state, { payload: contents }) =>
      produce(state, draft => {
        draft.contents = contents;
      }),
    [SET_CITY]: (state, { payload: cId }) =>
      produce(state, draft => {
        draft.cId = cId;
      }),
    [CHANGE_TYPE]: (state, { payload: cmTypeId }) =>
      produce(state, draft => {
        draft.cmTypeId = cmTypeId;
      }),
  },
  initialState,
);

export default community;
