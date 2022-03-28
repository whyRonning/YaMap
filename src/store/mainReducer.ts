export type markersType = {
    id: number,
    name: string,
    long: number,
    lat: number,
    isActive: boolean
}
export type dataType = {
    markers: Array<markersType>,
    count: number,
    center: Array<number>
}
type actionsType<T extends { [keys: string]: (...args: any) => any }> = ReturnType<T extends { [keys: string]: infer U } ? U : never>
const data: dataType = {
    markers: [
        {
            id: 0,
            name: "Точка 1",
            lat: 55.87883391988633,
            long: 37.68294060905703,
            isActive: true
        }, {
            id: 1,
            name: "Точка 2",
            lat: 55.72061454465857,
            long: 37.523308888149316,
            isActive: false
        }, {
            id: 2,
            name: "Точка 3",
            lat: 55.71642376857964,
            long: 37.61394375202502,
            isActive: false
        }, {
            id: 3,
            name: "Точка 4",
            lat: 55.754293912466366,
            long: 37.63660305378283,
            isActive: false
        }, {
            id: 4,
            name: "Точка 5",
            lat: 55.78521660038577,
            long: 37.7114920710402,
            isActive: false
        },],
    count: 4,
    center: [55.751574, 37.573856]
}
export const mainReducer = (state: dataType = data, action: actionsType<typeof actions>) => {
    switch (action.type) {
        case "deletePoint": {
            return {
                ...state, markers:
                    state.markers
                        .filter((e) => {
                            return e.id !== action.id
                        })
            }
        }
        case "addPoint": {
            const copyState: dataType = JSON.parse(JSON.stringify(state))
            copyState.count++
            copyState.markers.push({
                id: copyState.count,
                name: action.name,
                lat: copyState.center[0],
                long: copyState.center[1],
                isActive: true
            })
            return copyState
        }
        case "changePointPositions": {
            const copyState: dataType = JSON.parse(JSON.stringify(state))
            copyState.markers.splice(action.endIndex, 0, copyState.markers.splice(action.startIndex, 1)[0])
            return {...copyState};
        }
        case "changePointActive": {
            const copyState: dataType = JSON.parse(JSON.stringify(state))
            const index = copyState.markers.findIndex((e) => {
                return e.id === action.id
            })
            copyState.markers[index].isActive = !copyState.markers[index].isActive
            return copyState
        }
        case "changeCenterMap":
            return {...state, center: action.coords}
        case "changePlacemarkCoord": {
            const copyState: dataType = JSON.parse(JSON.stringify(state));
            const index = copyState.markers.findIndex((e) => {
                return e.id === action.id
            })
            copyState.markers[index].lat = action.coords[0];
            copyState.markers[index].long = action.coords[1];
            return copyState
        }

        default:
            return state
    }
}
export const actions = {
    deletePointAC: (id: number) => ({
        type: "deletePoint",
        id
    } as const),
    addPointAC: (name: string) => ({
        type: "addPoint",
        name
    } as const),
    changePlacemarkCoordAC: (id: number, coords: Array<number>) => ({
        type: "changePlacemarkCoord",
        id,
        coords
    } as const),
    changePointActiveAC: (id: number) => ({
        type: "changePointActive",
        id
    } as const),
    changeCenterMapAC: (coords: Array<number>) => ({
        type: "changeCenterMap",
        coords
    } as const),
    changePointPositionsAC: (startIndex: number, endIndex: number) => ({
        type: "changePointPositions",
        startIndex,
        endIndex
    } as const)
}
