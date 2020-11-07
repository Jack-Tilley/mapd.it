import "./App.css";
import { MapProvider } from "./components/MapContext";
import Map from "./components/Map";
import SiteTree from "./components/SiteTree";
import DrawingComponent from "./components/DrawingComponent";
import OverlayNameBox from "./components/OverlayNameBox";
import ApiTest from "./components/ApiTest";

function App() {
  return (
    <div style={{ height: "500px" }}>
      <MapProvider>
        <Map />
        <div className="treeContainer">
          <SiteTree />
          {/* <OverlayNameBox/> */}
        </div>
      </MapProvider>
      <ApiTest />
    </div>
  );
}

export default App;
