import React from 'react';

import {PointBlockContainer} from "./components/pointBlock/pointBlockContainer";
import styled from "styled-components";
import {MapContainer} from "./components/map/mapContainer";
const Main=styled.main`
  display: grid;
  grid-template-columns: 33% 67%;
`
export const App = () => (
    <Main className="App">
        <PointBlockContainer/>
        <MapContainer/>
    </Main>
);
