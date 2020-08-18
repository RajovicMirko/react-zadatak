const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_RESOURCE":
      return Object.assign({}, state, {
        data: null,
        filteredData: null,
        isLoading: true,
        error: false,
      });
    case "DONE_GET_RESOURCE":
      return Object.assign({}, state, {
        data: action.data,
        filteredData: action.data,
        isLoading: false,
        error: false,
      });
    case "ERROR_GET_RESOURCE":
      return Object.assign({}, state, {
        data: null,
        filteredData: null,
        isLoading: false,
        error: true,
      });

    case "SEARCH_RESOURCE":
      return Object.assign({}, state, {
        filteredData: action.data,
        isLoading: false,
        error: false,
      });

    case "DONE_SEARCH_RESOURCE":
      return Object.assign({}, state, {
        filteredData: action.filteredData,
        isLoading: false,
        error: false,
      });

    case "ADD_RESOURCE":
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case "DONE_ADD_RESOURCE":
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
      });
    case "ERROR_ADD_RESOURCE":
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
      });

    case "DELETE_RESOURCE":
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case "DONE_DELETE_RESOURCE":
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
      });
    case "ERROR_DELETE_RESOURCE":
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
      });

    default:
      return state;
  }
};

export default rootReducer;
