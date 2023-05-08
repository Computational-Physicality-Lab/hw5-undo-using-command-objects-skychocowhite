import React from 'react';
import CommandObject from './CommandObject';

export default class DeleteCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.addToUndoStack) this.undoHandler.registerExecution(this);
  }

  undo() {
    this.changePanel();
    this.undoHandler.redisplaySelectedShape(this.targetObject.id);
  }

  redo() {
    this.undoHandler.deleteSelectedShape(this.targetObject.id);
    this.undoHandler.changeCurrMode("select");
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) {
      if (this.addToUndoStack) {
        this.undoHandler.registerExecution(Object.assign(Object.create(Object.getPrototypeOf(this)), this));
      }
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="DeleteCommandObject">
          Delete {this.targetObject.type}
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}