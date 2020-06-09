import React, { Component } from "react";
import { InputGroup, Input, FormGroup, Label } from "reactstrap";

import "./Search.css";
import { connect } from "react-redux";
import {
  searchSelectVolume,
  searchSelectChange,
  storeUpdate,
} from "../../actions";

class Search extends Component {
  render() {
    console.log("render search");
    return (
      <div>
        <div className="search-group">
          <InputGroup
            onChange={(event) => {
              const result = this.props.searchData.filter((item) =>
                item.s.includes(
                  event.target.value.toUpperCase().replace("/", "")
                )
              );
              this.props.storeUpdate(result);
            }}
          >
            <Input className="input" placeholder="Search" />
          </InputGroup>
          <div className="search-options">
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio2"
                  defaultChecked
                  onChange={searchSelectChange}
                />
                Change
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio2"
                  onChange={searchSelectVolume}
                />
                Volume
              </Label>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ searchData }) => {
  return {
    searchData,
  };
};

const mapDispatchToProps = {
  storeUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
