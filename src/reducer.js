const initialState = {
  message: "",
  data: [],
  favorites: [],
  changeOrVolume: 'change'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BTC_STORE_UPDATE":
      return {
        ...state,
        data: action.payload
      };

    case "ASSET_STORE_UPDATE":
      return {
        ...state,
        data: action.payload
      };

    case "STORE_UPDATE_WEBSOCKET":
      return {
        ...state,
        data: action.payload
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
      

    default:
      return state;
  }
};

export default reducer;
