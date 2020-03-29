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
export {
  btcStoreUpdate,
  assetStoreUpdate,
  storeUpdateWebsocket,
  changeVolumeSelect
};
