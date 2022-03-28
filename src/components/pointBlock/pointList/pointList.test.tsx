import { render, screen } from "@testing-library/react";
import { PointList } from "./pointList";
import { PointItem } from "./pointItem";

describe("pointList", () => {
  it("render list", () => {
    const fakeItems = [
      { id: 1, name: "Точка1", lat: 12, long: 12, isActive: false },
      { id: 2, name: "Точка2", lat: 12, long: 12, isActive: false },
    ].map((e, i) => (
      <PointItem
        key={e.id}
        id={e.id}
        name={e.name}
        isActive={e.isActive}
        index={i}
        deletePointAC={jest.fn()}
        changePointActiveAC={jest.fn()}
      />
    ));
    render(
      <PointList
        changePlacemarkPositionHandler={jest.fn()}
        ItemPoints={fakeItems}
      />
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
});
