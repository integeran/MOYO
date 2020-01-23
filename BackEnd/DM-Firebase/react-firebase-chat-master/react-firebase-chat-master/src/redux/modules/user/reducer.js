const initialState = {
  isSignedIn: false,
  data: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: ''
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_GET':
      return (state = {
        ...state,
        isSignedIn: true,
        data: { ...state.data, ...action.payload }
      });
    case 'USER_LOGOUT':
      return (state = { ...state, ...initialState });
    default:
      return state;
  }
}

export default reducer;
