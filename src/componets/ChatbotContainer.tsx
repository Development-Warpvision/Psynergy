import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";
import Draggable from "react-draggable";
import { Box, Button, Input } from "@mui/material";
// import "./styles.css";

const connectPointStyle = {
  position: "absolute",
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "black",
};
const connectPointOffset: any = {
  left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
  right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
  top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
  bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" },
};

const ConnectPointsWrapper = ({ boxId, handler, dragRef, boxRef }: any) => {
  const ref1 = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);
  return (
    <React.Fragment>
      <Box
        sx={{
          opacity: 0.2,
          "&:hover": {
            opacity: 0.6,
          },
        }}
        className="connectPoint"
        style={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position,
        }}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0,
          });
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setPosition({});
          setBeingDragged(false);
        }}
      />
      {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
    </React.Fragment>
  );
};

const boxStyle: any = {
  border: "1px solid black",
  position: "relative",
  padding: "20px 10px",
  marginBottom: "1rem",
};

const DraggableBox = ({ text, handler, addArrow, setArrows, boxId }: any) => {
  const dragRef = useRef<any>();
  const boxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <Draggable
      ref={dragRef}
      onDrag={(e) => {
        // console.log(e);
        setArrows((arrows: any) => [...arrows]);
      }}
    >
      <div
        id={boxId}
        ref={boxRef}
        style={boxStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (e.dataTransfer.getData("arrow") === boxId) {
            console.log(e.dataTransfer.getData("arrow"), boxId);
          } else {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
            console.log("droped!", refs);
          }
        }}
      >
        {text}
        <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
      </div>
    </Draggable>
  );
};

export default function App() {
  const [arrows, setArrows] = useState<any>([]);
  const addArrow = ({ start, end }: any) => {
    setArrows([...arrows, { start, end }]);
  };
  console.log(arrows);

  const [inputList, setInputList] = useState<any>([]);

  const onAddBtnClick = () => {
    setInputList(
      inputList.concat(
        <DraggableBox
          text="second element"
          {...{
            addArrow,
            setArrows,
            handler: "right",
            boxId: inputList.length.toString(),
          }}
        />
      )
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* two boxes */}
      <div>
        <Button sx={{m:5}} onClick={onAddBtnClick}>Add input</Button>
        {inputList}
      </div>
      {/* <DraggableBox
        text="drag my handler to second element"
        {...{ addArrow, setArrows, handler: "right", boxId: "box2_1" }}
      /> */}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <DraggableBox
          text="second element"
          {...{ addArrow, setArrows, handler: "left", boxId: "box2_2" }}
        />
        <DraggableBox
          text="second element"
          {...{ addArrow, setArrows, handler: "left", boxId: "box2_3" }}
        />
        <DraggableBox
          text="second element"
          {...{ addArrow, setArrows, handler: "left", boxId: "box2_4" }}
        />
      </div> */}
      {arrows.map((ar: any) => (
        <div
          onClick={() => {
            console.log(document.getElementById("box2_1")!.textContent);
            const index = arrows.findIndex(
              (obj: any) => obj.start === ar.start && obj.end === ar.end
            );

            console.log(index);
          }}
        >
          <Xarrow
            start={ar.start}
            end={ar.end}
            key={ar.start + "-." + ar.start}
          />
        </div>
      ))}
    </div>
  );
}
