// src/components/Header.tsx
import { getImageUrl } from "../../utils.ts";

import React from "react";
import styles from "./graphBody.module.css";

const MainBody: React.FC = () => {
  return (
    <section className={styles.container}>
      <img src={getImageUrl("wip.jpg")} alt="" className={styles.img} />
    </section>
  );
};

export default MainBody;
