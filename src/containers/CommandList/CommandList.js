import React, { Component } from "react";
import ControlContext from "../../contexts/control-context";

import './CommandList.css';

export default class CommandList extends Component {
  static contextType = ControlContext;

  constructor() {
    super();
  }

  render() {
    console.log("IN COMMAND LIST: ");
    console.log(this.context.commandList);
    return (
      <div className="CommandList">
        {this.context.commandList.map((element, index) => {
          let keyStr = element.id + "_" + index;
          return (
            <div className="commandGrid" key={keyStr}>
              {element.render()}
            </div>
          );
        })}
      </div>
    )
  }
}