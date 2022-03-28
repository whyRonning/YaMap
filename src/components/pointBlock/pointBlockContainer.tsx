import { connect, ConnectedProps } from "react-redux";
import { globalStateType } from "../../store/store";
import { actions } from "../../store/mainReducer";
import { PointItem } from "./pointList/pointItem";
import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { PointBlock } from "./pointBlock";

type propsType = ConnectedProps<typeof pointBlockConnector>;
const MSTP = (state: globalStateType) => ({
  markers: state.mainReducer.markers,
});
const PointBlockHOC = (props: propsType) => {
  const ItemPoints = props.markers.map((e, i) => (
    <PointItem
      deletePointAC={props.deletePointAC}
      changePointActiveAC={props.changePointActiveAC}
      name={e.name}
      isActive={e.isActive}
      index={i}
      id={e.id}
      key={e.id}
    />
  ));
  const changePlacemarkPositionHandler = (event: DropResult) => {
    if (event.destination) {
      props.changePointPositionsAC(event.source.index, event.destination.index);
    }
  };
  return (
    <PointBlock
      changePlacemarkPositionHandler={changePlacemarkPositionHandler}
      ItemPoints={ItemPoints}
    />
  );
};

const pointBlockConnector = connect(MSTP, {
  changePointPositionsAC: actions.changePointPositionsAC,
  changePointActiveAC: actions.changePointActiveAC,
  deletePointAC: actions.deletePointAC,
});
export const PointBlockContainer = pointBlockConnector(PointBlockHOC);
