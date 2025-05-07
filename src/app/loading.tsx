import React from "react";
import styles from "@/styles/loading.module.css"; // Importando o CSS para estilização

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.govLogoWrapper}>
        {/* Substitua pelo brasão ou logo oficial */}
        <div className={styles.govLogoPlaceholder}></div>
      </div>

      <div className={styles.loadingContent}>
        <div className={styles.loadingBars}>
          {/* Barras que lembram gráficos econômicos */}
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
          <div className={`${styles.bar} ${styles.bar4}`}></div>
          <div className={`${styles.bar} ${styles.bar5}`}></div>
        </div>

        <div className={styles.loadingText}>
          <p>Analisando dados fiscais...</p>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}></div>
          </div>
        </div>

        <div className={styles.financeElements}>
          <div className={styles.coins}>
            <div className={styles.coin}></div>
            <div className={styles.coin}></div>
            <div className={styles.coin}></div>
          </div>
          <div className={styles.document}></div>
        </div>
      </div>

      <div className={styles.footerNote}>
        <p>
          Ministério das Finanças - Garantindo a transparência e eficiência na
          gestão pública
        </p>
      </div>
    </div>
  );
}
