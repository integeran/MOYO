export const initialState = {
  postList: [],
  pos: {},
  infoWindow: null,
  infoWindowCheck: false,
};

export const POSTMAP_GETPOSTLIST = 'POSTMAP_GETPOSTLIST';
export const POSTMAP_GETPOS = 'POSTMAP_GETPOS';
export const POSTMAP_GETINFOWINDOW = 'POSTMAP_GETINFOWINDOW';

export const getPostListAction = res => {
  return {
    type: POSTMAP_GETPOSTLIST,
    payload: res,
  };
};

export const getPosAction = res => {
  return {
    type: POSTMAP_GETPOS,
    payload: res,
  };
};

export const getInfoWindow = res => {
  return {
    type: POSTMAP_GETINFOWINDOW,
    payload: res,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTMAP_GETPOSTLIST: {
      return {
        ...state,
        postList: action.payload,
      };
    }

    case POSTMAP_GETPOS: {
      return {
        ...state,
        pos: action.payload,
      };
    }

    case POSTMAP_GETINFOWINDOW: {
      return {
        ...state,
        infoWindowCheck: action.payload ? true : false,
        infoWindow: action.payload,
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
