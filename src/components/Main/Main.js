import React, { Component } from "react";
import { connect } from "react-redux";

import { btcStoreUpdate, storeUpdateWebsocket } from "../../actions";
import { dispatch } from "../../index";

class Main extends Component {
  socket = new WebSocket(
    "wss://stream.binance.com/stream?streams=!miniTicker@arr"
  );

  componentDidMount = async () => {
    //
    try {
      const response = await fetch(`http://localhost:3001/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const result = await json.data.filter(item => item.pm === "BTC");
    //   console.log("!all data", json.data);
    //   console.log("!result", result);
      dispatch(btcStoreUpdate(result));
    } catch (error) {
      console.log(error);
    }

         console.log("! Props", this.props.data);
    this.socket.onopen = e => {
    //   console.log("[open] Websocket connection open");
      this.socket.onmessage = event => {
        let result = JSON.parse(event.data);
        // console.log("JSON", result);
        // console.log(result.data);
        // console.log("! Props", this.props.data);
        // console.log("! result", result.data);

        let updatedData = this.props.data.map(item => {
          for (let index = 0; index < result.data.length; index++) {
            if (item.s === result.data[index].s) {
            //   console.log(item.s, "!Updated");
              if (item.c < 1) {
                item = {
                  ...item,
                  c: Number(result.data[index].c).toFixed(7),
                  v: Number(result.data[index].v).toFixed(2)
                };
              } else if (Number.isInteger(item.c)) {
                item = {
                  ...item,
                  c: Math.round(Number(result.data[index].c)),
                  v: Number(result.data[index].v).toFixed(2)
                };
              } else {
                item = {
                  ...item,
                  c: Number(result.data[index].c).toFixed(2),
                  v: Number(result.data[index].v).toFixed(2)
                };
              }
              // TODO: отображение разных дробей
            }
          }
          return item;
        });
        // console.log("updated data: ", updatedData);
        dispatch(storeUpdateWebsocket(updatedData));
      };
    };
  };
  render() {
      
    return <></>;
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps)(Main);
