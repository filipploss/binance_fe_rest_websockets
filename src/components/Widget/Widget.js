import React from "react";
import NavComponent from "../NavComponent";
import Search from "../Search";
import Chart from "../Chart";

const Widget = props => {
  return (
    <div>
      <div>
        <b>Market</b>
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
