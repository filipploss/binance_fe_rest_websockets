import React, {Component} from "react";
import { InputGroup, Input, FormGroup, Label } from "reactstrap";

import "./Search.css";
import { connect } from "react-redux";
import { dispatch } from "../../index";
import { changeVolumeSelect, searchInput } from "../../actions";
import SearchLogo from '../../images/search.png'

class Search extends Component {
  render() {
    console.log('searchData', this.props.searchData)
  return (
    <div>
      <div className="search-group">
        <InputGroup onChange={event => {
          console.log(event.target.value)
          console.log('props', this.props)
          const result = this.props.searchData.filter(item => item.s.includes(event.target.value.toUpperCase().replace('/', '')));
          console.log('result', result)
          dispatch(searchInput(result))
          }}>
          <Input className='input' placeholder="Search" />
        </InputGroup>
        <div className="search-options">
          <FormGroup check>
            <Label check>
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
  )
              }}


const mapStateToProps = ({ data, searchData }) => {
  return {
    data, searchData
  };
};

export default connect(mapStateToProps)(Search);