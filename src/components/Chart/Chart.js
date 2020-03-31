import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

import { dispatch } from "../../index";
import { favButtonSelect } from "../../actions";
import "./Chart.css";

class Chart extends Component {
  render() {
    // console.log("favorites", this.props.favorites);
    // console.log('chart props', this.props)
    return (
      <div className="container">
        <Table size="sm" hover borderless>
          <thead>
            <tr>
              {/* <th>     </th> */}
              <th>Pair</th>
              <th>Last Price</th>
              {this.props.changeOrVolume === "change" ? (
                <th className='third-column'>Change</th>
              ) : (
                <th lassName='third-column'>Volume</th>
              )}
            </tr>
          </thead>

          {this.props.data.map((item, index) => {
            let favArray = this.props.favorites;
            let favStyle;
            favArray.find(i => i.s === item.s)
              ? (favStyle = "fav-button-checked")
              : (favStyle = "fav-button");
            return (
              <tbody key={index}>
                <tr>
                  {/* <th scope="row">★</th> */}
                  {/* <td>★</td> */}
                  <td>
                    {/* {favArray.find(i => i.s === item.s) ? ( */}
                    <button
                      className={favStyle}
                      onClick={() => {
                        if (!favArray.find(i => i.s === item.s)) {
                          favArray.push(item);
                          // console.log("!!!");
                          dispatch(favButtonSelect(favArray));
                        } else {
                          // let favArray = this.props.favorites;
                          // console.log(item);

                          favArray.forEach((i, index) => {
                            // console.log('i', i)
                            // console.log('item', item)
                            // console.log(i.s === item.s)
                            if (i.s === item.s) {
                              favArray.splice(index, 1);
                              // console.log("favIndex", index);
                              return;
                            }
                          });
                          dispatch(favButtonSelect(favArray));
                        }
                      }}
                    >
                      ★
                    </button>
                    {item.b}/{item.q}
                  </td>
                  <td>{item.c}</td>

                  {this.props.changeOrVolume === "change" ? (
                    ((item.c / item.o) * 100 - 100).toFixed(2) < 0 ? (
                      <td className="negative third-column">
                        {((item.c / item.o) * 100 - 100).toFixed(2)}%
                      </td>
                    ) : (
                      <td className="positive third-column">
                        +{((item.c / item.o) * 100 - 100).toFixed(2)}%
                      </td>
                    )
                  ) : (
                    <td>{item.v}</td>
                  )}
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ data, changeOrVolume, favorites }) => {
  return {
    data,
    changeOrVolume,
    favorites
  };
};

export default connect(mapStateToProps)(Chart);
