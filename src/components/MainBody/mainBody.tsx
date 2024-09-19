// src/components/Header.tsx
import TextCard from "../TextCard/textCard.tsx";

import React from "react";
import styles from "./mainBody.module.css";
import PresetButtons from "../PresetButtons/presetButtons.tsx";
import InfoDisplay from "../InfoDisplay/infoDisplay";
import NumberDisplay from "../NumberDisplay/numberDisplay";

const MainBody: React.FC = () => {
  let pageState = 0;
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <TextCard></TextCard>
        <PresetButtons presetState={pageState}></PresetButtons>
      </div>
      <div className={styles.main}>
        <InfoDisplay
          shadowDirection="right"
          statusBar="Streak"
          streaksDone={1}
          minutesActive={100}
        ></InfoDisplay>
        <NumberDisplay
          shadowDirection="right"
          streaksDone={1}
          minutesActive={150}
          breaksTaken={2}
          timedle={55}
        ></NumberDisplay>
      </div>
    </section>
  );
};

export default MainBody;
