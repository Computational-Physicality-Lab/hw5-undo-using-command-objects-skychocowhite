import React from "react";
import CommandObject from "./CommandObject";

export default class ChangeBorderColorCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, newBorderColor) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.newValue = newBorderColor;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.borderColor;
      this.targetObject.borderColor = this.newValue;
      if (this.addToUndoStack) this.undoHandler.registerExecution(this);
    }
  }

  undo() {
    this.targetObject.borderColor = this.oldValue;
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { borderColor: this.oldValue });
  }

  redo() {
    this.targetObject.borderColor = this.newValue;
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { borderColor: this.newValue });
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.borderColor;
      this.targetObject.borderColor = this.newValue;
      if (this.addToUndoStack) this.undoHandler.registerExecute(JSON.parse(JSON.stringify(this)));
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="ChangeBorderColorCommandObject">
          Change {this.targetObject.type} border color to {this.newValue}
        </div >
      );
    } else {
      return (
        <></>
      );
    }
  }
}