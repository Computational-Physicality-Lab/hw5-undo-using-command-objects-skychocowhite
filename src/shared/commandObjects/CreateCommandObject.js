import React from "react";
import CommandObject from "./CommandObject";

export default class CreateCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    console.log(this.targetObject);
    if (this.targetObject !== undefined) this.undoHandler.registerExecution(this);
  }

  undo() {
    this.undoHandler.deleteSelectedShape(this.targetObject.id);
    this.undoHandler.changeCurrMode("select");
  }

  redo() {
    this.undoHandler.redisplaySelectedShape(this.targetObject.id);
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, {});
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) this.undoHandler.registerExecution(new CreateCommandObject(this));
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="CreateCommandObject">
          Create {this.targetObject.type}
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}