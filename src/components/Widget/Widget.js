import React from "react";
import NavComponent from "../NavComponent";
import Search from "../Search";
import Chart from "../Chart";
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
    </div>
  );
};

export default Widget;
