const storeUpdate = (payload) => ({ type: "STORE_UPDATE", payload });

const changeVolumeSelect = (payload) => ({
  type: "CHANGE_VOLUME_SELECT",
  payload,
});

const favButtonSelect = (payload) => ({
  type: "FAV_BUTTON_SELECT",
  payload,
});

const searchDataInit = (payload) => ({
  type: "SEARCH_DATA_INIT",
  payload,
});

export { storeUpdate, changeVolumeSelect, favButtonSelect, searchDataInit };
