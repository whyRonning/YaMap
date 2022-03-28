import { AddPointStrokeContainer } from "./addPointStroke/addPointStrokeContainer";
import { PointList } from "./pointList/pointList";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
type propsType = {
  ItemPoints: Array<JSX.Element>;
  changePlacemarkPositionHandler: (event: DropResult) => void;
};
const PointListBlock = styled.section`
  margin: 1.2vh 0 0 1.5vw;
`;
export const PointBlock = (props: propsType) => (
  <PointListBlock>
    <AddPointStrokeContainer />
    <PointList
      ItemPoints={props.ItemPoints}
      changePlacemarkPositionHandler={props.changePlacemarkPositionHandler}
    />
  </PointListBlock>
);
