import React from "react";
import styles from "@/styles/loading.module.css"; // Importando o CSS para estilização

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingBars}>
          {/* Barras que lembram gráficos econômicos */}
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
          <div className={`${styles.bar} ${styles.bar4}`}></div>
          <div className={`${styles.bar} ${styles.bar5}`}></div>
        </div>
        {/* <div className={styles.loadingText}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
