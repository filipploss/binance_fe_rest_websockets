import React from "react";
import { InputGroup, Input, FormGroup, Label } from "reactstrap";
import './Search.css'

export default function Search() {
  return (
    <div>
      <div className='search-group'>
        <InputGroup>
          <Input placeholder="Search" />
        </InputGroup>
        <div className='search-options'>
        <FormGroup check className='search-unit'>
          <Input type="radio" /> Volume
        </FormGroup>
        <FormGroup check className='search-options-unit'>
          <Label check>
            <Input type="radio" /> Change
          </Label>
        </FormGroup>
        </div>
      </div>
    </div>
  );
}
