import React from "react";
import { InputGroup, Input, FormGroup, Label } from "reactstrap";

import "./Search.css";
import { changeVolumeSelect } from "../../actions";
import { dispatch } from "../../index";

export default function Search() {
  return (
    <div>
      <div className="search-group">
        <InputGroup>
          <Input placeholder="🔍 Search" />
        </InputGroup>
        <div className="search-options">
          <FormGroup check>
            <Label check >
              <Input
                className="radio-button"
                type="radio"
                name="radio2"
                defaultChecked
                onChange={() => {
                  dispatch(changeVolumeSelect("change"));
                }}
              />
              Change
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio2"
                onChange={() => {
                  dispatch(changeVolumeSelect("volume"));
                }}
              />
              Volume
            </Label>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
