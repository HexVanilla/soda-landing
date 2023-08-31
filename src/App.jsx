import { useState, useEffect } from "react";
import { useRef } from "react";
import Spline from "@splinetool/react-spline";
import RiveLogo from "./components/RiveLogo";
import RiveText from "./components/RiveText";
import "./App.css";
import RiveLoading from "./components/RiveLoading";
function App() {
  const [selected, setSelected] = useState(false);
  const [loadedSceneA, setLoadedSceneA] = useState(false);
  const [loadedSceneB, setLoadedSceneB] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [switchSpline, setSwitchSpline] = useState(false);
  const spline = useRef();

  const scene01 =
    "https://prod.spline.design/N50PUNQ0hJUJ8vEs/scene.splinecode";
  const scene02 =
    "https://prod.spline.design/kI85vxVtRVaxOPgZ/scene.splinecode";

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window width
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array means this useEffect will run once, similar to componentDidMount and componentWillUnmount

  function onLoadA() {
    console.log("A");
    setLoadedSceneA(true);
  }

  function onLoadB() {
    console.log("B");
    setLoadedSceneB(true);
  }
  useEffect(() => {
    updateScene();
  }, [windowWidth, selected]);

  const updateScene = () => {
    if (selected) {
      setTimeout(() => {
        setSwitchSpline(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setSwitchSpline(false);
      }, 1500);
    }
  };

  function handleClick(e) {
    console.log("click " + e.target.name);
  }

  function handleEnterPage() {
    setSelected(true);
    setPageLoaded(true);
  }

  return (
    <>
      <div className="loading-container">
        <RiveLoading className="loading" selected={selected} />
      </div>

      <div className={`app-container ${selected}`}>
        {!pageLoaded && (
          <div className="landing">
            <button onClick={() => handleEnterPage()}>ACTION BUTTON</button>
          </div>
        )}

        <div className={`app ${pageLoaded}`}>
          <div className="rive-overlay-logo">
            <RiveLogo setSelected={setSelected} className="rive-logo" />
          </div>
          <div className="rive-overlay-text">
            <RiveText selected={selected} className="rive-text" />
          </div>

          <Spline
            scene={scene01}
            onMouseDown={(e) => handleClick(e)}
            onLoad={onLoadA}
            className={`spline-bg ${switchSpline}`}
          />
          <Spline
            scene={scene02}
            onMouseDown={(e) => handleClick(e)}
            onLoad={onLoadB}
            className={`spline-bg ${!switchSpline}`}
          />
        </div>
        <div className={`rive-text-mobile-container ${selected}`}>
          <RiveText selected={selected} className="rive-text-mobile" />
        </div>
      </div>
    </>
  );
}

export default App;
