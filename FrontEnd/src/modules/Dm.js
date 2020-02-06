export const initialState = {
  MAKEID_CHAR: '@make@',
  DATETIME_CHAR: '@time@',
};

// export const DM_INIT = 'DM_INIT';

// export const initAction = res => {
//   return {
//     type: DM_INIT,
//     payload: res,
//   };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case DM_INIT: {
    //   return {
    //     ...state,
    //   }
    // }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
