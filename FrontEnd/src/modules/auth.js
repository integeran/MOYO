import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);

const initialState = {
  userDataId: {
    provider: '',
    socialId: '',
  },
  userData: {
    userToken: '',
    uid: '',
    nickname: '',
    age: '',
    gender: '',
    image: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
  },
  initialState,
);

export default auth;
