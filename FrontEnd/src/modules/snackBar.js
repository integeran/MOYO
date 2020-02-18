export const initialState = {
  snackBarOpen: false,
  snackBarMessage: '',
};

export const SNACKBAR_OPENSNACKBAR = 'SNACKBAR_OPENSNACKBAR';
export const SNACKBAR_CLOSESNACKBAR = 'SNACKBAR_CLOSESNACKBAR';

export const openSnackBarAction = res => {
  return {
    type: SNACKBAR_OPENSNACKBAR,
    payload: res,
  };
};

export const closeSnackBarAction = () => {
  return {
    type: SNACKBAR_CLOSESNACKBAR,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SNACKBAR_OPENSNACKBAR: {
      return {
        ...state,
        snackBarOpen: true,
        snackBarMessage: action.payload,
      };
    }

    case SNACKBAR_CLOSESNACKBAR: {
      return {
        ...state,
        snackBarOpen: false,
        snackBarMessage: '',
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
