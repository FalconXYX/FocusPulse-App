import styles from "./App.module.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header.tsx";
import MainBody from "./components/MainBody/mainBody.tsx";
import SettingBody from "./components/SettingBody/settingBody.tsx";
import GraphBody from "./components/GraphBody/graphBody.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MainInstance, { Main } from "./services/main.ts";
import { useEffect } from "react";
async function setup() {
  const main = await MainInstance(); // Await the promise to get the actual 'Main' instance

  if (main) {
    const currentPreset = main.CurrentPreset; // Now you can safely call the method
    return main;
  } else {
    console.error("Failed to get Main instance");
  }
}

function App() {
  const pageState = 0;
  useEffect(() => {
    const main = setup();
    const currentPreset = main.CurrentPreset;
  }, []);
  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <Router basename={"/"}>
            <Header pageState={pageState}></Header>
            <Routes>
              <Route path="/" element={<MainBody buttonState={1}></MainBody>} />
              <Route
                path="/settings"
                element={<SettingBody buttonState={1}></SettingBody>}
              />
              <Route path="/graph" element={<GraphBody></GraphBody>} />
            </Routes>
          </Router>
        </div>
      </section>
    </>
  );
}

export default App;
