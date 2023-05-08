import React, { Component } from "react";
import ControlContext from "../../contexts/control-context";

import './CommandList.css';

export default class CommandList extends Component {
  static contextType = ControlContext;

  render() {
    return (
      <div className="CommandList">
        {this.context.commandList.map((element, index) => {
          let keyStr = element.id + "_" + index;
          let ifSelected = this.context.currCommand === index;
          let ifRedone = this.context.currCommand < index;
          return (
            <div className="commandGrid" key={keyStr} data-selected={ifSelected} data-redone={ifRedone}>
              {element.render()}
            </div>
          );
        })}
      </div>
    )
  }
}