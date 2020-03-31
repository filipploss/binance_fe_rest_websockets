import React from "react";
import NavComponent from "../NavComponent";
import Search from "../Search";
import Chart from "../Chart";
import Main from '../Main'
import './Widget.css'



const Widget = props => {
  
  return (
    <div>
      <div>
        <h1>Market</h1>
      </div>
      <NavComponent />
      <div>
        <Search />
        <Chart />
      </div>
      {/* {console.log(props)} */}
    <button onClick={props.startWebsocket}>Close Websocket</button>
    </div>
  );
};

export default Widget;
