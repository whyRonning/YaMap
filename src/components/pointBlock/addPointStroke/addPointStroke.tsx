import React, { ChangeEvent } from "react";
import styled from "styled-components";

type propsType = {
  addPointAC: (name: string) => void;
  text: string;
  changeTextHandler: (e: ChangeEvent) => void;
  enterChecker: (e: React.KeyboardEvent) => void;
};
const Stroke = styled.input`
  width: 29vw;
  height: 3.4vh;
  font-size: 2vmin;
`;

export const AddPointStroke = (props: propsType) => (
  <Stroke
    type="text"
    onKeyDown={props.enterChecker}
    onChange={props.changeTextHandler}
    placeholder={"Новая точка"}
    value={props.text}
  />
);
