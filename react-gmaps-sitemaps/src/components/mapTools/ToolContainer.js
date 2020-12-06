import React, { useState } from "react";
import DistanceFinder from "./DistanceFinder";
import PanTool from "./PanTool";
import RefreshButton from "./RefreshButton";

const ToolContainer = () => {
  const [distanceToolRendered, setDistanceToolRendered] = useState(false);

  return (
    <>
      <DistanceFinder
        distanceToolRendered={distanceToolRendered}
        setDistanceToolRendered={setDistanceToolRendered}
      />
      <PanTool
        distanceToolRendered={distanceToolRendered}
        setDistanceToolRendered={setDistanceToolRendered}
      />
      <RefreshButton />
    </>
  );
};
export default ToolContainer;
