import React from "react";
import CommandObject from "./CommandObject";

export default class MoveCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, oldPoint, newPoint) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.oldValue = oldPoint;
    this.newValue = newPoint;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.targetObject !== undefined) {
      this.undoHandler.registerExecution(this);
    }
  }

  undo() {
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, {
      initCoords: {
        x: this.targetObject.initCoords.x,
        y: this.targetObject.initCoords.y,
      },
      finalCoords: {
        x: this.targetObject.finalCoords.x,
        y: this.targetObject.finalCoords.y,
      },
    })
  }

  redo() {
    const deltaX = this.newValue.x - this.oldValue.x;
    const deltaY = this.newValue.y - this.oldValue.y;

    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, {
      initCoords: {
        x: this.targetObject.initCoords.x + deltaX,
        y: this.targetObject.initCoords.y + deltaY,
      },
      finalCoords: {
        x: this.targetObject.finalCoords.x + deltaX,
        y: this.targetObject.finalCoords.y + deltaY,
      },
    });
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) {
      this.undoHandler.registerExecution(new MoveCommandObject(this));
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="MoveCommandObject">
          Move {this.targetObject.type}
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}