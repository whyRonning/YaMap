import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
type propsType = {
  id: number;
  name: string;
  isActive: boolean;
  index: number;
  deletePointAC: (id: number) => void;
  changePointActiveAC: (id: number) => void;
};
const PointBlock = styled.div`
  height: 5vh;
  display: grid;
  grid-template-columns: 45% 45% 5%;
  padding: 3vh 0 3vh 0;
`;
const Delete = styled.p`
  margin: 0;
  width: auto;
  cursor: pointer;
`;
const PointTitle = styled.label`
  margin: 0;
  overflow: hidden;
`;
const CheckBox = styled.input`
  height: 2.2vmin;
  width: 2.2vmin;
`;

export const PointItem = (props: propsType) => (
  <Draggable draggableId={String(props.id)} index={props.index}>
    {(provided) => (
      <PointBlock
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <PointTitle htmlFor={"checkBox-" + props.id}>{props.name}</PointTitle>
        <CheckBox
          id={"checkBox-" + props.id}
          onChange={() => {
            props.changePointActiveAC(props.id);
          }}
          checked={props.isActive}
          type="checkbox"
        />
        <Delete
          onClick={() => {
            props.deletePointAC(props.id);
          }}
        >
          X
        </Delete>
      </PointBlock>
    )}
  </Draggable>
);
