import action from "./index.js";

const storeUpdate = (payload) => ({ type: "STORE_UPDATE", payload });
const searchSelectVolume = () => action("SEARCH_SELECT_VOLUME_WATCH");
const searchSelectChange = () => action("SEARCH_SELECT_CHANGE_WATCH");
const favButtonSelect = (payload) => ({
  type: "FAV_BUTTON_SELECT",
  payload,
});

const searchDataInit = (payload) => ({
  type: "SEARCH_DATA_INIT",
  payload,
});

export {
  storeUpdate,
  searchSelectVolume,
  searchSelectChange,
  favButtonSelect,
  searchDataInit,
};
