import React, { Component } from "react";

export default class Main extends Component {
  state = {
    message: ""
  };
  socket = new WebSocket(
    "wss://stream.binance.com/stream?streams=!miniTicker@arr"
  );
  message;
  componentDidMount = () => {
    this.socket.onopen = e => {
      console.log("[open] Соединение установлено");
      console.log("Отправляем данные на сервер");
      //   this.socket.send("Меня зовут Джон");
      this.socket.onmessage = event => {
        this.setState({ ...this.state,
            message: JSON.parse(event.data)})
            console.log(this.state);
      };
     
    };
  };
  render() {
    return <div>{JSON.stringify(this.state.message)}</div>;
  }
}
