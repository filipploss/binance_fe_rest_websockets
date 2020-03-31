import React, { Component } from "react";
import { connect } from "react-redux";

import { storeInit, storeUpdateWebsocket, searchDataInit } from "../../actions";
import { dispatch } from "../../index";
import Widget from "../Widget";

class Main extends Component {
  startWebsocket = () => {
    if (this.socket) {
      this.socket.close(1000, "Button clicked");
      this.socket.onclose = event => {
        console.log("[close] Websocket connection closed");
      };
    }

    this.socket = new WebSocket(
      "wss://stream.binance.com/stream?streams=!miniTicker@arr"
    );

    this.socket.onopen = e => {
      console.log("[open] Websocket connection open");
      this.socket.onmessage = event => {
        let result = JSON.parse(event.data);
        let updatedData = this.props.data.map(item => {
          for (let index = 0; index < result.data.length; index++) {
            if (item.s === result.data[index].s) {
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
        dispatch(storeUpdateWebsocket(updatedData));
      };
    };
  };

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:3001/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const result = await json.data.filter(item => item.pm === "BTC");
      //   console.log("!all data", json.data);
      //   console.log("!result", result);
      dispatch(storeInit(result));
      dispatch(searchDataInit(json.data));
    } catch (error) {
      console.log(error);
    }

    this.startWebsocket();
   
  };
  
  render() {
    return (
      <>
        <Widget startWebsocket={this.startWebsocket} />
        {/* <button onClick={this.closeWebsocket}>Websocket close</button> */}
      </>
    );
  }
}

const mapStateToProps = ({ data, searchData }) => {
  return {
    data,
    searchData
  };
};

export default connect(mapStateToProps)(Main);
