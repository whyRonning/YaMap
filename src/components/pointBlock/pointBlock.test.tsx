import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dataType, mainReducer } from "../../store/mainReducer";
import { defaultData } from "./addPointStroke/addPointStroke.test";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { PointBlockContainer } from "./pointBlockContainer";
import {
  DND_DIRECTION_DOWN,
  DND_DIRECTION_UP,
  DND_DRAGGABLE_DATA_ATTR,
  makeDnd,
} from "react-beautiful-dnd-test-utils";

const renderWithRedux = (state: dataType = defaultData) => {
  render(
    <Provider
      store={createStore(combineReducers({ mainReducer }), {
        mainReducer: state,
      })}
    >
      <PointBlockContainer />
    </Provider>
  );
};
describe("pointBlock", () => {
  it("add placemark", () => {
    renderWithRedux({
      count: 1,
      center: [21, 21],
      markers: [{ id: 1, name: "Точка1", lat: 12, long: 12, isActive: false }],
    });
    const Stroke = screen.getByPlaceholderText("Новая точка");
    userEvent.type(Stroke, "моя точка");
    userEvent.type(Stroke, "abc{enter}");
    expect(Stroke).toHaveValue("");
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
  it("delete placemark", () => {
    renderWithRedux({
      count: 2,
      center: [21, 21],
      markers: [
        { id: 0, name: "Точка1", lat: 12, long: 12, isActive: false },
        { id: 1, name: "Точка2", lat: 12, long: 12, isActive: false },
      ],
    });
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    userEvent.click(screen.getAllByText("X")[0]);
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });
  it("drag placemark from list", async () => {
    renderWithRedux({
      count: 2,
      center: [21, 21],
      markers: [
        { id: 0, name: "Точка1", lat: 12, long: 12, isActive: false },
        { id: 1, name: "Точка2", lat: 12, long: 12, isActive: false },
        { id: 2, name: "Точка3", lat: 12, long: 12, isActive: false },
      ],
    });

    await makeDnd({
      getDragElement: () =>
        screen.getByText("Точка3").closest(DND_DRAGGABLE_DATA_ATTR),
      direction: DND_DIRECTION_UP,
      positions: 2,
    });
    expect(screen.getAllByText(/Точка/)[0]).toHaveTextContent("Точка3");
  });
});
