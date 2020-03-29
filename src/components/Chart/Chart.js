import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

import "./Chart.css";

class Chart extends Component {
  render() {
    return (
      <div className="container">
        <Table size="sm" hover>
          <thead>
            <tr>
              {/* <th>     </th> */}
              <th>Pair</th>
              <th>Last Price</th>
              {this.props.changeOrVolume === "change" ? (
                <th>Change</th>
              ) : (
                <th>Volume</th>
              )}
            </tr>
          </thead>

          {this.props.data.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  {/* <th scope="row">★</th> */}
                  {/* <td>★</td> */}
                  <td>
                  ★ {item.b}/{item.q}
                  </td>
                  <td>{item.c}</td>

                  {this.props.changeOrVolume === "change" ? (
                    ((item.c / item.o) * 100 - 100).toFixed(2) < 0 ? (
                      <td className="negative">
                        {((item.c / item.o) * 100 - 100).toFixed(2)}%
                      </td>
                    ) : (
                      <td className="positive">
                        {((item.c / item.o) * 100 - 100).toFixed(2)}%
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

const mapStateToProps = ({ data, changeOrVolume }) => {
  return {
    data,
    changeOrVolume
  };
};

export default connect(mapStateToProps)(Chart);
