import { connect, ConnectedProps } from "react-redux";
import { AddPointStroke } from "./addPointStroke";
import { actions } from "../../../store/mainReducer";
import React, { ChangeEvent, useState } from "react";

type propsType = ConnectedProps<typeof addPointStrokeConnector>;

const AddPointStrokeHOC = (props: propsType) => {
  const [text, setText] = useState("");
  const changeTextHandler = (e: ChangeEvent) => {
    setText((e.target as HTMLTextAreaElement).value);
  };
  const enterChecker = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setText("");
      props.addPointAC(text);
    }
  };
  return (
    <AddPointStroke
      enterChecker={enterChecker}
      changeTextHandler={changeTextHandler}
      text={text}
      addPointAC={props.addPointAC}
    />
  );
};
const addPointStrokeConnector = connect(null, {
  addPointAC: actions.addPointAC,
});
export const AddPointStrokeContainer =
  addPointStrokeConnector(AddPointStrokeHOC);
