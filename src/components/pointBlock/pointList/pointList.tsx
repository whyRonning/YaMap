import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

type propsType = {
  ItemPoints: Array<JSX.Element>;
  changePlacemarkPositionHandler: (event: DropResult) => void;
};
const Section = styled.section`
  overflow-y: auto;
  height: 93vh;
`;
export const PointList = (props: propsType) => (
  <DragDropContext onDragEnd={props.changePlacemarkPositionHandler}>
    <Droppable droppableId={"draggable"}>
      {(provided) => (
        <Section {...provided.droppableProps} ref={provided.innerRef}>
          {props.ItemPoints}
          {provided.placeholder}
        </Section>
      )}
    </Droppable>
  </DragDropContext>
);
