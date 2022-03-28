import { Placemark } from "react-yandex-maps";
type propsType = {
  id: number;
  lat: number;
  long: number;
  name: string;
  dragPlacemarkHandle: (e: any, id: number) => void;
};
export const PlaceMark = (props: propsType) => (
  <Placemark
    onDragEnd={(e: any) => {
      props.dragPlacemarkHandle(e, props.id);
    }}
    properties={{ balloonContent: props.name }}
    options={{ draggable: "true", openBalloonOnClick: "true" }}
    modules={["geoObject.addon.balloon"]}
    geometry={[props.lat, props.long]}
  />
);
