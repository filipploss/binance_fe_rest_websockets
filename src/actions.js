const btcStoreUpdate = payload => ({ type: "BTC_STORE_UPDATE", payload });
const assetStoreUpdate = payload => ({ type: "ASSET_STORE_UPDATE", payload });
const storeUpdateWebsocket = payload => ({
  type: "STORE_UPDATE_WEBSOCKET",
  payload
});
const changeVolumeSelect = payload => ({
  type: "CHANGE_VOLUME_SELECT",
  payload
});

const favButtonSelect = payload => ({
  type: "FAV_BUTTON_SELECT",
  payload
});

const searchInput = payload => ({
  type: "SEARCH_INPUT",
  payload
});

const searchDataInit = payload => ({
  type: "SEARCH_DATA_INIT",
  payload
});

export {
  btcStoreUpdate,
  assetStoreUpdate,
  storeUpdateWebsocket,
  changeVolumeSelect,
  favButtonSelect,
  searchInput,
  searchDataInit
};
