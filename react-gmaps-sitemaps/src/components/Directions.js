import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { useState } from "react";
const Directions = () => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        // console.log("response: ", response);
      }
    }
  };
  return (
    <>
      <DirectionsService
        // required
        options={{
          destination: { lat: 40, lng: -75 },
          origin: { lat: 41, lng: -75 },
          travelMode: "DRIVING",
        }}
        // required
        callback={directionsCallback}
        // optional
        onLoad={(directionsService) => {
          console.log(
            "DirectionsService onLoad directionsService: ",
            directionsService
          );
        }}
      />
      <DirectionsRenderer
        // required
        options={{
          directions: response,
        }}
        // optional
        onLoad={(directionsRenderer) => {
          console.log(
            "DirectionsRenderer onLoad directionsRenderer: ",
            directionsRenderer
          );
        }}
      />
    </>
  );
};
export default Directions;
