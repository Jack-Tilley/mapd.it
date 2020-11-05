import React, {useState, useContext} from 'react';
import {MapContext} from './MapContext'
import { GoogleMap } from '@react-google-maps/api'
import DrawingComponent from './DrawingComponent'


const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const Map = () => {
  const [ myMap, setMyMap, center, setCenter, isLoaded, draw, setDraw, nodes, setNodes] = useContext(MapContext);
  
  const renderMap = () => (
    <>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoom={10}
          center={center}
          onLoad={map => setMyMap(map)}
          options={options}
        >
            <DrawingComponent/>
        </GoogleMap>
    </>
  )

  return isLoaded ? renderMap() : null;
}

export default Map;

