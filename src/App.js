import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";
import { genId, defaultValues } from "./shared/util";

import "./App.css";
import CommandList from "./containers/CommandList/CommandList";
import CreateCommandObject from "./shared/commandObjects/CreateCommandObject";

class App extends Component {
  state = {
    // controls
    currMode: defaultValues.mode,
    currBorderColor: defaultValues.borderColor,
    currBorderWidth: defaultValues.borderWidth,
    currFillColor: defaultValues.fillColor,

    // workspace
    shapes: [],
    shapesMap: {},
    selectedShapeId: undefined,

    // handling undo/redo
    commandList: [],
    currCommand: -1,
  };

  constructor() {
    super();

    /*
     * pass this undoHandler into command object constructors:
     *  e.g. let cmdObj = new ChangeFillColorCommandObject(this.undoHandler);
     */
    this.undoHandler = {
      registerExecution: this.registerExecution,
      // TODO: fill this up with whatever you need for the command objects
      updateShape: this.updateShape,
      deleteSelectedShape: this.deleteSelectedShape,
      redisplaySelectedShape: this.redisplaySelectedShape,
      changeCurrMode: this.changeCurrMode,
      changeCurrBorderColor: this.changeCurrBorderColor,
      changeCurrBorderWidth: this.changeCurrBorderWidth,
      changeCurrFillColor: this.changeCurrFillColor,
    };
  }

  /*
   * TODO:
   * add the commandObj to the commandList so
   * that is available for undoing.
   */
  registerExecution = (commandObject) => {
    let newList = [...this.state.commandList];
    if (this.state.currCommand < this.state.commandList.length - 1) {
      newList = newList.slice(0, this.state.currCommand + 1);
    }
    newList.push(commandObject);

    let newCommandCount = this.state.currCommand + 1;
    this.setState({
      commandList: newList,
      currCommand: newCommandCount
    });
  };

  /*
   * TODO:
   * actually call the undo method of the command at
   * the current position in the undo stack
   */
  undo = () => {
    if (this.state.currCommand >= 0) {
      this.state.commandList[this.state.currCommand].undo();

      let newCommandCount = this.state.currCommand - 1;
      this.setState({
        currCommand: newCommandCount
      });
    }
  };

  /*
   * TODO:
   * actually call the redo method of the command at
   * the current position in the undo stack. Note that this is
   * NOT the same command as would be affected by a doUndo()
   */
  redo = () => {
    if (this.state.currCommand < this.state.commandList.length - 1) {
      this.state.commandList[this.state.currCommand + 1].redo();

      let newCommandCount = this.state.currCommand + 1;
      this.setState({
        currCommand: newCommandCount
      });
    }
  };

  // add the shapeId to the array, and the shape itself to the map
  addShape = (shapeData) => {
    let shapes = [...this.state.shapes];
    let shapesMap = { ...this.state.shapesMap };
    const id = genId();
    shapesMap[id] = {
      ...shapeData,
      id,
    };
    shapes.push(id);
    this.setState({ shapes, shapesMap });

    let cmdObj = new CreateCommandObject(this.undoHandler, shapesMap[id]);
    if (cmdObj.canExecute()) {
      cmdObj.execute();
    }
  };

  // get the shape by its id, and update its properties
  updateShape = (shapeId, newData) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[shapeId];
    shapesMap[shapeId] = { ...targetShape, ...newData };
    this.setState({ shapesMap: shapesMap, selectedShapeId: shapeId });
  };

  moveShape = (newData) => {
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, newData);
    }
  };

  // deleting a shape sets its visibility to false, rather than removing it
  deleteSelectedShape = (shapeId) => {
    let shapesMap = { ...this.state.shapesMap };
    let newSelectedId = shapeId === this.state.selectedShapeId ? undefined : this.state.selectedShapeId;
    shapesMap[shapeId].visible = false;
    this.setState({ shapesMap, selectedShapeId: newSelectedId });
  };

  redisplaySelectedShape = (shapeId) => {
    let shapesMap = { ...this.state.shapesMap };
    shapesMap[shapeId].visible = true;
    this.setState({ shapesMap, selectedShapeId: shapeId });
  }

  changeCurrMode = (mode) => {
    this.setState({ currMode: mode, selectedShapeId: undefined });
  };

  changeCurrBorderColor = (borderColor) => {
    this.setState({ currBorderColor: borderColor });
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, { borderColor });
    }
  };

  changeCurrBorderWidth = (borderWidth) => {
    this.setState({ currBorderWidth: borderWidth });
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, { borderWidth });
    }
  };

  changeCurrFillColor = (fillColor) => {
    this.setState({ currFillColor: fillColor });
    if (this.state.selectedShapeId && this.state.currMode !== 'line') {
      this.updateShape(this.state.selectedShapeId, { fillColor });
    }
  };

  undoRedoDownHandler = (e) => {
    if ((e.metaKey && e.shiftKey && e.key === 'Z') ||
      (e.ctrlKey && e.key === 'y')) {
      this.redo();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      this.undo();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.undoRedoDownHandler, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.undoRedoDownHandler, true);
  }


  render() {
    const {
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
      shapes,
      shapesMap,
      selectedShapeId,
      commandList,
      currCommand,
    } = this.state;

    // update the context with the functions and values defined above and from state
    // and pass it to the structure below it (control panel and workspace)
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            undoHandler: this.undoHandler,

            currMode,
            changeCurrMode: this.changeCurrMode,
            currBorderColor,
            changeCurrBorderColor: this.changeCurrBorderColor,
            currBorderWidth,
            changeCurrBorderWidth: this.changeCurrBorderWidth,
            currFillColor,
            changeCurrFillColor: this.changeCurrFillColor,

            shapes,
            shapesMap,
            addShape: this.addShape,
            moveShape: this.moveShape,
            selectedShapeId,
            selectShape: (id) => {
              this.setState({ selectedShapeId: id });
              if (id) {
                const { borderColor, borderWidth, fillColor } = shapesMap[
                  shapes.filter((shapeId) => shapeId === id)[0]
                ];
                this.setState({
                  currBorderColor: borderColor,
                  currBorderWidth: borderWidth,
                  currFillColor: fillColor,
                });
              }
            },
            deleteSelectedShape: this.deleteSelectedShape,

            undo: this.undo,
            redo: this.redo,

            commandList,
            currCommand,
          }}
        >
          <ControlPanel />
          <Workspace />
          <CommandList></CommandList>
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
