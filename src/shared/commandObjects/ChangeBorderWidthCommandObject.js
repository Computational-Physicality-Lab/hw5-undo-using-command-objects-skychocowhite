import React from "react";
import CommandObject from "./CommandObject";

export default class ChangeBorderWidthCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, oldBorderWidth) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.oldValue = oldBorderWidth;
    this.newValue = selectedObj.borderWidth;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.targetObject !== undefined) {
      this.targetObject.borderWidth = this.newValue;
      if (this.addToUndoStack) this.undoHandler.registerExecution(this);
    }
  }

  undo() {
    this.targetObject.borderWidth = this.oldValue;
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { borderWidth: this.oldValue });
  }

  redo() {
    this.targetObject.borderWidth = this.newValue;
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { borderWidth: this.newValue });
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.borderWidth;
      this.targetObject.borderWidth = this.newValue;
      if (this.addToUndoStack) {
        this.undoHandler.registerExecution(Object.assign(Object.create(Object.getPrototypeOf(this)), this));
      }
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="ChangeBorderWidthCommandObject">
          Change {this.targetObject.type} border width to {this.newValue}
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}