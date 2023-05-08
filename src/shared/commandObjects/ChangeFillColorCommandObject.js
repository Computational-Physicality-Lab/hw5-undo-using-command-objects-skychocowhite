import React from "react";
import CommandObject from "./CommandObject";

export default class ChangeFillColorCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, newFillColor) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.newValue = newFillColor;
  }

  /* override to return true if this command can be executed,
   *  e.g., if there is an object selected
   */
  canExecute() {
    return this.targetObject !== undefined; // global variable for selected
  }

  /* override to execute the action of this command.
   * pass in false for addToUndoStack if this is a command which is NOT
   * put on the undo stack, like Copy, or a change of selection or Save
   */
  execute() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.fillColor; // object's current color
      this.targetObject.fillColor = this.newValue; // actually change

      // Note that this command object must be a NEW command object so it can be
      // registered to put it onto the stack
      if (this.addToUndoStack) this.undoHandler.registerExecution(new ChangeFillColorCommandObject(this));
    }
  }

  /* override to undo the operation of this command
   */
  undo() {
    this.targetObject.fillColor = this.oldValue;
    // maybe also need to fix the palette to show this object's color?
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { fillColor: this.oldValue });
  }

  /* override to redo the operation of this command, which means to
   * undo the undo. This should ONLY be called if the immediate
   * previous operation was an Undo of this command. Anything that
   * can be undone can be redone, so there is no need for a canRedo.
   */
  redo() {
    this.targetObject.fillColor = this.newValue;
    // maybe also need to fix the palette to show this object's color?
    this.changePanel();
    this.undoHandler.updateShape(this.targetObject.id, { fillColor: this.newValue });
  }

  /* override to return true if this operation can be repeated in the
   * current context
   */
  canRepeat() {
    return this.targetObject !== undefined;
  }

  /* override to execute the operation again, this time possibly on
   * a new object. Thus, this typically uses the same value but a new
   * selectedObject.
   */
  repeat() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.fillColor; // object's current color
      // no change to newValue since reusing the same color
      this.targetObject.fillColor = this.newValue; // actually change

      // Note that this command object must be a NEW command object so it can be
      // registered to put it onto the stack
      if (this.addToUndoStack) this.undoHandler.registerExecution({ ...this });
    }
  }

  render() {
    if (this.targetObject !== undefined) {
      return (
        <div className="ChangeFillColorCommandObject">
          Change {this.targetObject.type} fill color to {this.newValue}
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}
