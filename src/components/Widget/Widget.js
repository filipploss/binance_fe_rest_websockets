import React from "react";
import NavComponent from "../NavComponent";
import Search from "../Search";

const Widget = props => {
  return (
    <div>
      <div>
        <b>Market</b>
      </div>
      <NavComponent />
      <div>
      <Search />
    
      </div>
    </div>
  );
};

export default Widget;
