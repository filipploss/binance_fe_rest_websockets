import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { connect } from "react-redux";
import { dispatch } from "../../index";
import { assetStoreUpdate } from "../../actions";

const NavComponent = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const assetFilter = async asset => {
    try {
      const response = await fetch(`http://localhost:3001/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      let result;
      if (asset === "BTC" || asset === "BNB") {
        result = await json.data.filter(item => item.pm === asset);
      } else if (asset === "FAV") {
        // console.log("!");
        // console.log("nav props", props);
        // console.log("nav json.data", json.data);
        let res = [];
        // console.log(
        //   "result",
          props.favorites.forEach(item => {
            for (let index = 0; index < json.data.length; index++) {
              if (item.s === json.data[index].s) {
                res.push(json.data[index]);
              }
            }
            return res;
          })
        // );
        result = res;
        console.log("res", result);
      } else {
        result = await json.data.filter(item => item.q === asset);
      }
      // console.log("!result", result);
      dispatch(assetStoreUpdate(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={() => assetFilter("FAV")}>
                ★
              </NavLink>
            </NavItem>
            {/* Margin is not found in the API */}
            <NavItem>
              <NavLink href="#">Margin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => assetFilter("BNB")}>
                BNB
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => assetFilter("BTC")}>
                BTC
              </NavLink>
            </NavItem>
            {/* PN (category of parent market) doesn't contain names of ALTS, that's why it's hardcored in the dropdown */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                ALTS
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => assetFilter("XRP")}>
                  XRP
                </DropdownItem>
                <DropdownItem onClick={() => assetFilter("ETH")}>
                  ETH
                </DropdownItem>
                <DropdownItem onClick={() => assetFilter("TRX")}>
                  TRX
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                USD$
              </DropdownToggle>
              {/* PN (category of parent market) doesn't contain category of USD stable coins, that's why it's hardcored in the dropdown */}
              <DropdownMenu right>
                <DropdownItem onClick={() => assetFilter("BUSD")}>
                  BUSD
                </DropdownItem>
                <DropdownItem onClick={() => assetFilter("USDT")}>
                  USDT
                </DropdownItem>
                <DropdownItem onClick={() => assetFilter("USDC")}>
                  USDC
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = ({ favorites }) => {
  return {
    favorites
  };
};

export default connect(mapStateToProps)(NavComponent);
