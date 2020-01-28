export const initialState = {
  INDEXDB_DB_NAME: 'User',
  INDEXDB_VERSION: 1,
  INDEXDB_STORE: 'Users',
  MAKEID_CHAR: '@make@',
  DATETIME_CHAR: '@time@',
  SPLIT_CHAR: '@spl@',
  ONE_VS_ONE: 'ONE_VS_ONE',
  MULTI: 'MULTI',
  ORIGINAL_TITLE: 'Chat List',

  sender: null,
  receiver: null,
  initUpload: true,
  isOpenRoom: false,
  roomList: [],
  messageList: [],
  waitTest: true,
};

export const DM_INIT = 'DM_INIT';
export const DM_INITUPLAOD_UPDATE = 'DM_INITUPLOAD_UPDATE';
export const DM_ISOPENROOM = 'DM_ISOPENROOM';
export const DM_ROOMLIST_UPDATE = 'DM_ROOMLIST_UPDATE';
export const DM_MESSAGELIST_UPDATE = 'DM_MESSAGELIST_UPDATE';
export const DM_CHANGE_RECEIVER = 'DM_CHANGE_RECEIVER';

export const initAction = res => {
  return {
    type: DM_INIT,
    payload: res,
  };
};

export const initUpload_updateAction = {
  type: DM_INITUPLAOD_UPDATE,
};

export const isOpenRoomAction = res => {
  return {
    type: DM_ISOPENROOM,
    payload: res,
  };
};

export const roomList_updateAction = res => {
  return {
    type: DM_ROOMLIST_UPDATE,
    payload: res,
  };
};

export const messageList_updateAction = res => {
  return {
    type: DM_MESSAGELIST_UPDATE,
    payload: res,
  };
};

export const changeReceiverAction = res => {
  return {
    type: DM_CHANGE_RECEIVER,
    payload: res,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DM_INIT: {
      return {
        ...state,
        sender: action.payload.data.data.sender,
        receiver: action.payload.data.data.receiver,
        waitTest: false,
      };
    }

    case DM_INITUPLAOD_UPDATE: {
      return {
        ...state,
        initUpload: false,
      };
    }

    case DM_ISOPENROOM: {
      return {
        ...state,
        isOpenRoom: action.payload,
      };
    }

    case DM_ROOMLIST_UPDATE: {
      console.log(action.payload);
      return {
        ...state,
        roomList: action.payload,
      };
    }

    case DM_MESSAGELIST_UPDATE: {
      console.log('DM_MESSAGELIST_UPADTE: ', action.payload);
      return {
        ...state,
        messageList: action.payload,
      };
    }

    case DM_CHANGE_RECEIVER: {
      return {
        ...state,
        receiver: action.payload,
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
