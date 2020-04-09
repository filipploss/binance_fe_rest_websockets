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
import { storeUpdate } from "../../actions";
import "./NavComponent.css";

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
        let res = [];
        props.favorites.forEach(item => {
          for (let index = 0; index < json.data.length; index++) {
            if (item.s === json.data[index].s) {
              res.push(json.data[index]);
            }
          }
          return res;
        });
        result = res;
      } else {
        result = await json.data.filter(item => item.q === asset);
      }

      dispatch(storeUpdate(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto navbar" navbar>
            <NavItem>
              <NavLink href="#" className="nav-fav" onClick={() => assetFilter("FAV")}>
                ★
              </NavLink>
            </NavItem>
            {/* Margin is not found in the API
            <NavItem>
              <NavLink href="#" className="nav-link">
                Margin
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                href="#"
                className="nav-link nav-bnb"
                onClick={() => assetFilter("BNB")}
              >
                BNB
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className="nav-link nav-btc"
                onClick={() => assetFilter("BTC")}
              >
                BTC
              </NavLink>
            </NavItem>
            {/* PN (category of parent market) doesn't contain names of ALTS, that's why it's hardcored in the dropdown */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="nav-link nav-alts">
                ALTS
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  className="nav-link nav-xrp"
                  onClick={() => assetFilter("XRP")}
                >
                  XRP
                </DropdownItem>
                <DropdownItem
                  className="nav-link nav-eth"
                  onClick={() => assetFilter("ETH")}
                >
                  ETH
                </DropdownItem>
                <DropdownItem
                  className="nav-link nav-trx"
                  onClick={() => assetFilter("TRX")}
                >
                  TRX
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="nav-link nav-usd">
                USDⓈ
              </DropdownToggle>
              {/* PN (category of parent market) doesn't contain category of USD stable coins, that's why it's hardcored in the dropdown */}
              <DropdownMenu right>
                <DropdownItem
                  className="nav-link nav-busd"
                  onClick={() => assetFilter("BUSD")}
                >
                  BUSD
                </DropdownItem>
                <DropdownItem
                  className="nav-link nav-usdt"
                  onClick={() => assetFilter("USDT")}
                >
                  USDT
                </DropdownItem>
                <DropdownItem
                  className="nav-link"
                  onClick={() => assetFilter("USDC")}
                >
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
