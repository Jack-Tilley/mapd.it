import { Paper } from "@material-ui/core";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";

// pac-container {
//   background-color: blue !important;
// }

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
      <Paper>
        <input
          className="autocomplete"
          type="text"
          placeholder="Find Someplace!"
          // style={{
          //   top: "1em",
          //   left: "16em",
          //   boxSizing: `border-box`,
          //   border: `1px solid transparent`,
          //   width: `250px`,
          //   height: `32px`,
          //   padding: `0 12px`,
          //   borderRadius: `3px`,
          //   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          //   fontSize: `14px`,
          //   outline: `none`,
          //   textOverflow: `ellipses`,
          //   position: "absolute",
          //   margin: "auto",
          // color: "red",
          // backgroundColor: "blue",
          // }}
        />
      </Paper>
    </Autocomplete>
  );
};
export default AutocompleteBox;
