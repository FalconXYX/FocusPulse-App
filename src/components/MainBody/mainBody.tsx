// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import TextCard from "../TextCard/textCard.tsx";
import { changePreset, getCurrentPreset } from "../../services/main.ts";
import styles from "./mainBody.module.css";
import PresetButtons from "../PresetButtons/presetButtons.tsx";
import InfoDisplay from "../InfoDisplay/infoDisplay";
import NumberDisplay from "../NumberDisplay/numberDisplay";

interface MainBodyProps {}

const MainBody: React.FC<MainBodyProps> = () => {
  const [numberState, setNumberState] = useState<number>(1); // Initialize with a default preset number
  useEffect(() => {
    async function fetchPreset() {
      const currentPreset = await getCurrentPreset();
      setNumberState(currentPreset); // Set the current preset number after loading
    }

    fetchPreset();
  }, [numberState]); // Fetch new preset data when numberState changes

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <TextCard />
        <PresetButtons
          presetState={numberState}
          changeCurrentPreset={async (preset: number) => {
            await changePreset(preset); // Call the service to change the preset
            setNumberState(preset); // Update the local state to trigger re-render
          }}
        />
      </div>
      <div className={styles.main}>
        <InfoDisplay
          shadowDirection="right"
          statusBar="Streak"
          streaksDone={1}
          minutesActive={100}
        />
        <NumberDisplay
          shadowDirection="right"
          streaksDone={1}
          minutesActive={150}
          breaksTaken={2}
          timedle={55}
        />
      </div>
    </section>
  );
};

export default MainBody;
