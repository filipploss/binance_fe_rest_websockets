const initialState = {
  message: "",
  data: [],
  favorites: [],
  changeOrVolume: "change",
  searchData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_UPDATE":
      return {
        ...state,
        data: action.payload,    
      };

    case "CHANGE_VOLUME_SELECT":
      return {
        ...state,
        changeOrVolume: action.payload
      };

    case "FAV_BUTTON_SELECT":
      return {
        ...state,
        favorites: action.payload
      };

      case "SEARCH_DATA_INIT":
        return {
          ...state,
          searchData: action.payload
        };

    default:
      return state;
  }
};

export default reducer;
