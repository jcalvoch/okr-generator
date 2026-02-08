"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import OKRDashboard from "../OKRDashboard";
import { getDefaultPreviewData } from "../okrDefaults";

const STORAGE_KEY = "okr-preview-data";

export default function PreviewPage() {
  const [data, setData] = useState(getDefaultPreviewData());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch (_) {
      setData(getDefaultPreviewData());
    }
  }, []);

  const { previewPageTitle, objective, period, kr1, kr2, kpis, reasoning } = data;

  return (
    <div className={styles.wrapper}>
      <section className={styles.previewSection}>
        <h1 className={styles.previewPageTitle}>{previewPageTitle || "Vista previa del panel"}</h1>
        <OKRDashboard
          objective={objective}
          period={period}
          kr1={kr1}
          kr2={kr2}
          kpis={kpis}
          reasoning={reasoning}
        />
        <p className={styles.backToGeneratorWrap}>
          <Link href="/" className={styles.backToGeneratorLink}>
            Ir al generador
          </Link>
        </p>
      </section>
    </div>
  );
}
