export const initialState = {
  MAKEID_CHAR: '@make@',
  DATETIME_CHAR: '@time@',
  lastMessageUser: '',
};

export const DM_LASTMESSAGEUSER = 'DM_LASTMESSAGEUSER';

export const changeLastMessageUserAction = res => {
  return {
    type: DM_LASTMESSAGEUSER,
    payload: res,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DM_LASTMESSAGEUSER: {
      return {
        ...state,
        lastMessageUser: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
