"use client";

import Link from "next/link";
import OKRDashboard from "./OKRDashboard";
import { PIVOTE_NAMES } from "./okrDefaults";

export default function PreviewView({ pivotes, activeTabIndex, setActiveTabIndex, showBackToGenerator, styles }) {
  const pivote = pivotes[activeTabIndex] ?? pivotes[0];
  const showTabs = pivotes.length >= 2;

  return (
    <div className={styles.wrapper}>
      <section className={styles.previewSection}>
        {showTabs ? (
          <>
            <div className={styles.pivotTabs}>
              {pivotes.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.pivotTab} ${i === activeTabIndex ? styles.pivotTabActive : ""}`}
                  onClick={() => setActiveTabIndex(i)}
                >
                  {p.previewPageTitle || PIVOTE_NAMES[i] || `Pivote ${i + 1}`}
                </button>
              ))}
            </div>
            <div className={styles.dashboardBlock}>
              <h1 className={styles.previewPageTitle}>
                {pivote.previewPageTitle || PIVOTE_NAMES[activeTabIndex] || `Pivote ${activeTabIndex + 1}`}
              </h1>
              <OKRDashboard
                objective={pivote.objective}
                period={pivote.period}
                kr1={pivote.kr1}
                kr2={pivote.kr2}
                kr3={pivote.kr3}
                kpis={pivote.kpis}
                reasoning={pivote.reasoning}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.previewPageTitle}>
              {pivote?.previewPageTitle || PIVOTE_NAMES[0] || "Vista previa del panel"}
            </h1>
            <div className={styles.dashboardBlock}>
              <OKRDashboard
                objective={pivote?.objective}
                period={pivote?.period}
                kr1={pivote?.kr1}
                kr2={pivote?.kr2}
                kr3={pivote?.kr3}
                kpis={pivote?.kpis}
                reasoning={pivote?.reasoning}
              />
            </div>
          </>
        )}
        {showBackToGenerator && (
          <p className={styles.backToGeneratorWrap}>
            <Link href="/generador" className={styles.backToGeneratorLink}>
              Ir al generador
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
