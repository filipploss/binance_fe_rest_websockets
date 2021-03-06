import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { storeUpdate, searchDataInit } from "../../actions";
import "./Main.css";

class Main extends Component {
  state = {
    websocketOpen: false,
  };

  openWebsocket = () => {
    this.socket = new WebSocket(
      "wss://stream.binance.com/stream?streams=!miniTicker@arr"
    );

    this.socket.onopen = (e) => {
      this.setState(function (state, props) {
        return {
          websocketOpen: true,
        };
      });
      console.log("[open] Websocket connection open");
      this.socket.onmessage = (event) => {
        let result = JSON.parse(event.data);
        let updatedData = this.props.data.map((item) => {
          for (let index = 0; index < result.data.length; index++) {
            if (item.s === result.data[index].s) {
              if (item.c < 1) {
                item = {
                  ...item,
                  c: Number(result.data[index].c).toFixed(7),
                  v: Number(result.data[index].v).toFixed(2),
                };
              } else if (Number.isInteger(item.c)) {
                item = {
                  ...item,
                  c: Math.round(Number(result.data[index].c)),
                  v: Number(result.data[index].v).toFixed(2),
                };
              } else {
                item = {
                  ...item,
                  c: Number(result.data[index].c).toFixed(2),
                  v: Number(result.data[index].v).toFixed(2),
                };
              }
            }
          }
          return item;
        });
        this.props.storeUpdate(updatedData);
      };
    };
  };

  startWebsocket = () => {
    if (this.state.websocketOpen) {
      this.socket.close(1000, "Button clicked");
      this.socket.onclose = (event) => {
        this.setState({
          websocketOpen: false,
        });
        console.log("[close] Websocket connection close");
        this.openWebsocket();
      };
    } else {
      this.openWebsocket();
    }
  };

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:3001/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const result = await json.data.filter((item) => item.pm === "BTC");
      this.props.storeUpdate(result);
      this.props.searchDataInit(json.data);
    } catch (error) {
      console.log(error);
    }

    this.startWebsocket();
  };

  render() {
    return (
      <>
        {this.props.children}
        {this.state.websocketOpen ? (
          <div className="button-websockets-container">
            <Button
              className="button-websockets"
              color="secondary"
              size="sm"
              onClick={this.startWebsocket}
            >
              Restart WebSocket
            </Button>
            WebSocket connection open
          </div>
        ) : (
          <div className="button-websockets-container">
            <Button
              className="button-websockets"
              color="secondary"
              disabled
              size="sm"
            >
              Restart WebSocket
            </Button>
            WebSocket connection closed
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ data, searchData }) => {
  return {
    data,
    searchData,
  };
};

const mapDispatchToProps = {
  storeUpdate,
  searchDataInit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
