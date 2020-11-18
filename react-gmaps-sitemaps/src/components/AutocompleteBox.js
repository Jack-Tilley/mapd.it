import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AutocompleteBox = ({ center, setCenter }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  return (
    <Autocomplete
      onLoad={(autoc) => setAutocomplete(autoc)}
      onPlaceChanged={() => {
        if (autocomplete !== null) {
          setCenter({
            lat: autocomplete.getPlace().geometry.location.lat(),
            lng: autocomplete.getPlace().geometry.location.lng(),
          });
        }
      }}
    >
      <input
        type="text"
        placeholder="Find Someplace!"
        style={{
          top: "0rem",
          left: "50%",
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          marginLeft: "-120px",
        }}
      />
    </Autocomplete>
  );
};
export default AutocompleteBox;
