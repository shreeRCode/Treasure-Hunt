import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";

function App() {
  const [showMap, setShowMap] = useState(false);

  return showMap ? (
    <MapPage onBack={() => setShowMap(false)} />
  ) : (
    <LandingPage onStart={() => setShowMap(true)} />
  );
}

export default App;
