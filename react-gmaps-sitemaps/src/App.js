import "./App.css";
import { MapProvider } from "./components/MapContext";
import Map from "./components/Map";
import SiteTree from "./components/SiteTree";
import HistoryDrawer from "./components/HistoryDrawer";

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
      <HistoryDrawer />
    </div>
  );
}

export default App;
