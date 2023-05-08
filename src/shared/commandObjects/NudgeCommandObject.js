import React from "react";
import CommandObject from "./CommandObject";

export default class NudgeCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, oldPoint, type) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.oldValue = oldPoint;
    this.type = type;
    this.value = 1;
  }

  moveShape(ifForward) {
    let deltaX = 0, deltaY = 0;
    if (this.type === 'left') {
      deltaX = -5 * this.value;
    } else if (this.type === 'up') {
      deltaY = -5 * this.value;
    } else if (this.type === 'right') {
      deltaX = 5 * this.value;
    } else {
      deltaY = 5 * this.value;
    }

    if (!ifForward) {
      deltaX *= -1;
      deltaY *= -1;
    }

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

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.targetObject !== undefined) {
      this.moveShape(true);
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
    });
  }

  redo() {
    this.changePanel();
    this.moveShape(true);
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

  incrementValue() {
    this.value += 1;
    if (this.targetObject !== undefined) {
      this.moveShape(true);
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="NudgeCommandObject">
          Nudge {this.targetObject.type} {this.type} {this.value * 5}px
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}