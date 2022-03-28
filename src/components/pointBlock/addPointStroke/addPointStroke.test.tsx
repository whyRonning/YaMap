import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { dataType, mainReducer } from "../../../store/mainReducer";
import { AddPointStroke } from "./addPointStroke";
import { AddPointStrokeContainer } from "./addPointStrokeContainer";
import userEvent from "@testing-library/user-event";

export const defaultData = {
  markers: [
    {
      id: 0,
      name: "Точка 1",
      lat: 55.87883391988633,
      long: 37.68294060905703,
      isActive: true,
    },
    {
      id: 1,
      name: "Точка 2",
      lat: 55.72061454465857,
      long: 37.523308888149316,
      isActive: false,
    },
    {
      id: 2,
      name: "Точка 3",
      lat: 55.71642376857964,
      long: 37.61394375202502,
      isActive: false,
    },
    {
      id: 3,
      name: "Точка 4",
      lat: 55.754293912466366,
      long: 37.63660305378283,
      isActive: false,
    },
    {
      id: 4,
      name: "Точка 5",
      lat: 55.78521660038577,
      long: 37.7114920710402,
      isActive: false,
    },
  ],
  count: 4,
  center: [55.751574, 37.573856],
};
const renderWithRedux = (state: dataType = defaultData) => {
  render(
    <Provider
      store={createStore(combineReducers({ mainReducer }), {
        mainReducer: state,
      })}
    >
      <AddPointStrokeContainer />
    </Provider>
  );
};
describe("stroke", () => {
  it("renderWithoutHOC", () => {
    render(
      <AddPointStroke
        addPointAC={jest.fn()}
        changeTextHandler={jest.fn()}
        text={""}
        enterChecker={jest.fn()}
      />
    );
    expect(screen.getByPlaceholderText("Новая точка")).toBeInTheDocument();
  });
  it("checkFunctionalWithoutHOC", () => {
    const addPointAC = jest.fn();
    const changeTextHandler = jest.fn();
    const enterChecker = jest.fn();
    render(
      <AddPointStroke
        addPointAC={addPointAC}
        changeTextHandler={changeTextHandler}
        text={""}
        enterChecker={enterChecker}
      />
    );
    const Stroke = screen.getByPlaceholderText("Новая точка");
    userEvent.type(Stroke, "текст");
    expect(changeTextHandler).toHaveBeenCalled();
    expect(enterChecker).toHaveBeenCalled();
  });
  it("renderWithHOC", () => {
    renderWithRedux();
    expect(screen.getByPlaceholderText("Новая точка")).toBeInTheDocument();
  });
});
