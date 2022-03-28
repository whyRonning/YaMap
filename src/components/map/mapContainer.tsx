import { connect, ConnectedProps } from "react-redux";
import { YaMap } from "./map";
import { actions } from "../../store/mainReducer";
import React from "react";
import { globalStateType } from "../../store/store";
import { PlaceMark } from "./placeMark";

type propsType = ConnectedProps<typeof mapConnector>;
const MSTP = (state: globalStateType) => ({
  markers: state.mainReducer.markers,
  center: state.mainReducer.center,
});
const MapHOC = (props: propsType) => {
  const dragPlacemarkHandle = (pos: any, id: number) => {
    props.changePlacemarkCoordAC(
      id,
      pos.get("target").geometry.getCoordinates()
    );
  };
  const activePoints = props.markers.filter((e) => e.isActive);
  const coordActivePoints = activePoints.map((e) => [e.lat, e.long]);
  const placemarks = activePoints.map((e) => (
    <PlaceMark
      id={e.id}
      dragPlacemarkHandle={dragPlacemarkHandle}
      name={e.name}
      key={e.id}
      lat={e.lat}
      long={e.long}
    />
  ));
  return (
    <YaMap
      center={props.center}
      changeCenterMapAC={props.changeCenterMapAC}
      coordActivePoints={coordActivePoints}
      placemarks={placemarks}
    />
  );
};

const mapConnector = connect(MSTP, {
  changePointPositionsAC: actions.changePointPositionsAC,
  changePointActiveAC: actions.changePointActiveAC,
  changePlacemarkCoordAC: actions.changePlacemarkCoordAC,
  changeCenterMapAC: actions.changeCenterMapAC,
});
export const MapContainer = mapConnector(MapHOC);
