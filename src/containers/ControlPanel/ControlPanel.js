import React, { useContext, useState } from "react";

import { FaTrash } from "react-icons/fa";
import { ImUndo, ImRedo } from "react-icons/im";

import CursorImg from "../../assets/img/cursor.png";
import LineImg from "../../assets/img/line.png";
import supportedColors from "../../shared/supportedColors";
import ControlContext from "../../contexts/control-context";

import "./ControlPanel.css";
import ChangeBorderWidthCommandObject from "../../shared/commandObjects/ChangeBorderWidthCommandObject";
import ChangeFillColorCommandObject from "../../shared/commandObjects/ChangeFillColorCommandObject";
import ChangeBorderColorCommandObject from "../../shared/commandObjects/ChangeBorderColorCommandObject";
import DeleteCommandObject from "../../shared/commandObjects/DeleteCommandObject";

const Modes = ({
  currMode,
  changeCurrMode,
  currBorderColor,
  currFillColor,
}) => {
  return (
    <div className="Control">
      <h3>Mode:</h3>
      <div className="Modes">
        <div
          className={["Mode", currMode === "select" ? "Active" : null].join(
            " "
          )}
          onClick={() => changeCurrMode("select")}
        >
          <img src={CursorImg} alt="cursor" />
        </div>
        <div
          className={["Mode", currMode === "line" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("line")}
        >
          <img src={LineImg} alt="line" />
        </div>
        <div
          className={["Mode", currMode === "rect" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("rect")}
        >
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
            }}
          ></div>
        </div>
        <div
          className={["Mode", currMode === "ellipse" ? "Active" : null].join(
            " "
          )}
          onClick={() => changeCurrMode("ellipse")}
        >
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ColorPicker = ({ title, currColor, setCurrColor, conflictColors, onClickEvent }) => {
  const context = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>{title}</h3>
      <div className="Modes">
        {supportedColors.map((color, idx) => (
          <div
            key={idx}
            className={["Mode", currColor === color ? "Active" : null].join(
              " "
            )}
            onClick={() => {
              if (
                !(
                  color === "transparent" &&
                  conflictColors.includes("transparent")
                )
              ) {
                setCurrColor(color);
                if (context.selectedShapeId) {
                  onClickEvent(context, color);
                }
              }
            }}
          >
            <div
              className="ColorBlock"
              style={{
                backgroundColor: color,
                border: color === "transparent" ? "none" : null,
                opacity:
                  color === "transparent" &&
                    conflictColors.includes("transparent")
                    ? 0.3
                    : null,
                cursor:
                  color === "transparent" &&
                    conflictColors.includes("transparent")
                    ? "not-allowed"
                    : null,
              }}
            >
              {color === "transparent" && "None"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderColor = ({
  currMode,
  currBorderColor,
  changeCurrBorderColor,
  currFillColor,
}) => {

  function borderColorClickEvent(context, newColor) {
    if (context.selectedShapeId && context.shapesMap[context.selectedShapeId].borderColor !== newColor) {
      let cmdObj = new ChangeBorderColorCommandObject(context.undoHandler, context.shapesMap[context.selectedShapeId], newColor);
      if (cmdObj.canExecute()) {
        cmdObj.execute();
      }
    }
  }

  return (
    <ColorPicker
      title={"Border color:"}
      currColor={currBorderColor}
      setCurrColor={changeCurrBorderColor}
      conflictColors={[
        currFillColor,
        currMode === "line" ? "transparent" : null,
      ]}
      onClickEvent={borderColorClickEvent}
    />
  );
};

const FillColor = ({ currFillColor, changeCurrFillColor, currBorderColor }) => {
  function fillColorClickEvent(context, newColor) {
    if (context.selectedShapeId && context.shapesMap[context.selectedShapeId].type !== 'line' && context.shapesMap[context.selectedShapeId].fillColor !== newColor) {
      let cmdObj = new ChangeFillColorCommandObject(context.undoHandler, context.shapesMap[context.selectedShapeId], newColor);
      if (cmdObj.canExecute()) {
        cmdObj.execute();
      }
    }
  }

  return (
    <ColorPicker
      title={"Fill color:"}
      currColor={currFillColor}
      setCurrColor={changeCurrFillColor}
      conflictColors={[currBorderColor]}
      onClickEvent={fillColorClickEvent}
    />
  );
};

const BorderWidth = ({ currBorderWidth, changeCurrBorderWidth }) => {
  let context = useContext(ControlContext);
  let [prevWidth, setPrevWidth] = useState(0);

  function mousedownEvent(event) {
    if (context.selectedShapeId) {
      setPrevWidth(parseInt(context.shapesMap[context.selectedShapeId].borderWidth));
    } else {
      setPrevWidth(0);
    }
  }

  function mouseupEvent(event) {
    if (prevWidth !== parseInt(event.target.value) && context.selectedShapeId) {
      let cmdObj = new ChangeBorderWidthCommandObject(context.undoHandler, context.shapesMap[context.selectedShapeId], String(prevWidth), event.target.value);
      if (cmdObj.canExecute()) {
        cmdObj.execute();
      }
    }
  }

  return (
    <div className="Control">
      <h3>Border width:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          tabIndex="-1"
          style={{ width: 200 }}
          onMouseDown={mousedownEvent}
          onChange={(e) => changeCurrBorderWidth(e.target.value)}
          onMouseUp={mouseupEvent}
          min={1}
          max={30}
          value={currBorderWidth}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currBorderWidth}</span>
      </div>
    </div>
  );
};

const Delete = ({ selectedShapeId, deleteSelectedShape }) => {
  const context = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>Delete:</h3>
      <div className="DeleteButtonsContainer">
        <button
          onClick={() => {
            if (context.selectedShapeId) {
              deleteSelectedShape(selectedShapeId);
              let cmdObj = new DeleteCommandObject(context.undoHandler, context.shapesMap[context.selectedShapeId]);
              if (cmdObj.canExecute()) {
                cmdObj.execute();
              }
            }
          }}
          disabled={!selectedShapeId}
          style={{
            cursor: !selectedShapeId ? "not-allowed" : null,
          }}
        >
          <FaTrash className="ButtonIcon" /> Delete
        </button>
      </div>
    </div>
  );
};

const UndoRedo = ({ undo, redo }) => {
  const context = useContext(ControlContext);
  const undoDisable = context.currCommand === -1;
  const redoDisable = context.currCommand >= context.commandList.length - 1;

  return (
    <div className="Control">
      <h3>Undo / Redo:</h3>
      <div className="UndoRedoButtonsContainer">
        <button onClick={() => undo()}
          disabled={undoDisable}
          style={{
            cursor: undoDisable ? "not-allowed" : null,
          }}
        >
          <ImUndo className="ButtonIcon"
          />
          Undo
        </button>
        <button onClick={() => redo()}
          disabled={redoDisable}
          style={{
            cursor: redoDisable ? "not-allowed" : null,
          }}
        >
          <ImRedo className="ButtonIcon" />
          Redo
        </button>
      </div>
    </div>
  );
};

const ControlPanel = () => {
  // use useContext to access the functions & values from the provider
  const {
    currMode,
    changeCurrMode,
    currBorderColor,
    changeCurrBorderColor,
    currFillColor,
    changeCurrFillColor,
    currBorderWidth,
    changeCurrBorderWidth,
    selectedShapeId,
    deleteSelectedShape,
    undo,
    redo,
  } = useContext(ControlContext);

  return (
    <div className="ControlPanel">
      <Modes
        currMode={currMode}
        changeCurrMode={changeCurrMode}
        currBorderColor={currBorderColor}
        currFillColor={currFillColor}
      />
      <BorderColor
        currMode={currMode}
        currBorderColor={currBorderColor}
        changeCurrBorderColor={changeCurrBorderColor}
        currFillColor={currFillColor}
      />
      <BorderWidth
        currBorderWidth={currBorderWidth}
        changeCurrBorderWidth={changeCurrBorderWidth}
      />
      <FillColor
        currFillColor={currFillColor}
        changeCurrFillColor={changeCurrFillColor}
        currBorderColor={currBorderColor}
      />
      <Delete
        selectedShapeId={selectedShapeId}
        deleteSelectedShape={deleteSelectedShape}
      />
      <UndoRedo undo={undo} redo={redo} />
    </div>
  );
};

export default ControlPanel;
