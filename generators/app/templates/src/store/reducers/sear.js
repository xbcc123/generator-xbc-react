const search = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchPrams: action.text
      };
    default:
      return state;
  }
};

export default search;
