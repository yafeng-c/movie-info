export const initialState = {
  results: null,
  selectedVideo: null,
};

const reducer = (state, action) => {
  //console.log(action.currentUser);
  switch (action.type) {
    case "GET_RESULTS":
      return {
        ...state,
        results: action.results,
      };
    case "SELECT_VIDEO":
      return {
        ...state,
        selectedVideo: action.selectedVideo,
      };

    case "GET_USER":
      return {
        ...state,
        currentUser: action.currentUser,
        userId: action.userId,
      };

    case "LOGOUT":
      return {
        state,
      };

    default:
      return state;
  }
};

export default reducer;
