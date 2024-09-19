import styles from "./App.module.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/header.tsx";
import MainBody from "./components/MainBody/mainBody.tsx";
import SettingBody from "./components/SettingBody/settingBody.tsx";
import GraphBody from "./components/GraphBody/graphBody.tsx";
import Main from "./services/main.ts";
function App() {
  const pageState = 0;
  console.log("App component loaded");
  Main();
  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <Router basename={"/"}>
            <Header pageState={pageState}></Header>
            <Routes>
              <Route path="/" element={<MainBody></MainBody>} />
              <Route path="/settings" element={<SettingBody></SettingBody>} />
              <Route path="/graph" element={<GraphBody></GraphBody>} />
            </Routes>
          </Router>
        </div>
      </section>
    </>
  );
}

export default App;
