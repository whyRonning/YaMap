import { GeoObject, YMaps, Map, ZoomControl } from "react-yandex-maps";
import styled from "styled-components";

const StyledMap = styled(Map)`
  height: 100vh;
`;
type propsType = {
  placemarks: Array<JSX.Element>;
  center: Array<number>;
  coordActivePoints: Array<Array<number>>;
  changeCenterMapAC: (coords: Array<number>) => void;
};
export const YaMap = (props: propsType) => (
  <YMaps>
    <StyledMap
      onBoundschange={(e: any) =>
        props.changeCenterMapAC(e.originalEvent.newCenter)
      }
      defaultState={{
        center: props.center,
        zoom: 9,
      }}
    >
      {props.placemarks}
      <ZoomControl options={{ float: "right" }} />
      <GeoObject
        geometry={{
          type: "LineString",
          coordinates: props.coordActivePoints,
        }}
        options={{
          geodesic: true,
          strokeWidth: 5,
          strokeColor: "#F008",
        }}
      />
    </StyledMap>
  </YMaps>
);
