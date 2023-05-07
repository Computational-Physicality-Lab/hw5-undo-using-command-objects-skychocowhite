import CommandObject from "./CommandObject";

export default class ChangeBorderWidthCommandObject extends CommandObject {
  constructor(undoHandler, selectedObj, newBorderWidth) {
    super(undoHandler, true);
    this.targetObject = selectedObj;
    this.newValue = newBorderWidth;
  }

  canExecute() {
    return this.targetObject !== undefined;
  }

  execute() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.borderWidth;
      this.targetObject.borderWidth = this.newValue;
      if (this.addToUndoStack) this.undoHandler.registerExecution(this);
    }
  }

  undo() {
    this.targetObject.borderWidth = this.oldValue;
  }

  redo() {
    this.targetObject.borderWidth = this.newValue;
  }

  canRepeat() {
    return this.targetObject !== undefined;
  }

  repeat() {
    if (this.targetObject !== undefined) {
      this.oldValue = this.targetObject.borderWidth;
      this.targetObject.borderWidth = this.newValue;
      if (this.addToUndoStack) this.undoHandler.registerExecution(JSON.parse(JSON.stringify(this)));
    }
  }
}