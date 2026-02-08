"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import OKRDashboard from "./OKRDashboard";
import {
  defaultPreviewTitle,
  defaultObjective,
  defaultPeriod,
  defaultKR1,
  defaultKR2,
  defaultKPIs,
  defaultReasoning,
} from "./okrDefaults";

const STORAGE_KEY = "okr-preview-data";

export default function Home() {
  const router = useRouter();
  const [previewPageTitle, setPreviewPageTitle] = useState(defaultPreviewTitle);
  const [objective, setObjective] = useState(defaultObjective);
  const [period, setPeriod] = useState(defaultPeriod);
  const [kr1, setKr1] = useState(defaultKR1);
  const [kr2, setKr2] = useState(defaultKR2);
  const [kpis, setKpis] = useState(defaultKPIs);
  const [reasoning, setReasoning] = useState(defaultReasoning);

  const openPreviewPage = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        previewPageTitle,
        objective,
        period,
        kr1,
        kr2,
        kpis,
        reasoning,
      }));
      router.push("/preview");
    }
  };

  const updateKpi = (index, field, value) => {
    setKpis((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Generador de OKR</h1>
        <p>Completa tu objetivo, resultados clave, KPIs y razonamiento. La vista previa se actualiza abajo.</p>
      </header>

      <section className={styles.formSection}>
        <h2>Datos</h2>

        <div className={styles.formBlock}>
          <div className={styles.formGroup}>
            <label htmlFor="previewTitle">Título de la vista previa</label>
            <input
              id="previewTitle"
              type="text"
              value={previewPageTitle}
              onChange={(e) => setPreviewPageTitle(e.target.value)}
              placeholder="ej. Objetivo de Innovación Centrada con el Cliente"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="objective">Objetivo</label>
            <input
              id="objective"
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="ej. Aumentar la satisfacción y retención de clientes"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="period">Período</label>
            <input
              id="period"
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="ej. Q1 2026 | Enero - Marzo"
            />
          </div>
        </div>

        <div className={styles.formBlock}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="kr1-desc">Resultado clave 1</label>
              <input
                id="kr1-desc"
                type="text"
                value={kr1.description}
                onChange={(e) => setKr1((p) => ({ ...p, description: e.target.value }))}
                placeholder="Descripción"
              />
              <div className={styles.inlineInputs}>
                <input
                  type="number"
                  aria-label="KR1 Actual"
                  value={kr1.actual}
                  onChange={(e) => setKr1((p) => ({ ...p, actual: +e.target.value }))}
                  placeholder="Actual"
                />
                <input
                  type="number"
                  aria-label="KR1 Meta"
                  value={kr1.meta}
                  onChange={(e) => setKr1((p) => ({ ...p, meta: +e.target.value }))}
                  placeholder="Meta"
                />
                <input
                  type="number"
                  aria-label="KR1 Inicio"
                  value={kr1.inicio}
                  onChange={(e) => setKr1((p) => ({ ...p, inicio: +e.target.value }))}
                  placeholder="Inicio"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="kr2-desc">Resultado clave 2</label>
              <input
                id="kr2-desc"
                type="text"
                value={kr2.description}
                onChange={(e) => setKr2((p) => ({ ...p, description: e.target.value }))}
                placeholder="Descripción"
              />
              <div className={styles.inlineInputs}>
                <input
                  type="number"
                  aria-label="KR2 Actual"
                  value={kr2.actual}
                  onChange={(e) => setKr2((p) => ({ ...p, actual: +e.target.value }))}
                  placeholder="Actual"
                />
                <input
                  type="number"
                  aria-label="KR2 Meta"
                  value={kr2.meta}
                  onChange={(e) => setKr2((p) => ({ ...p, meta: +e.target.value }))}
                  placeholder="Meta"
                />
                <input
                  type="number"
                  aria-label="KR2 Inicio"
                  value={kr2.inicio}
                  onChange={(e) => setKr2((p) => ({ ...p, inicio: +e.target.value }))}
                  placeholder="Inicio"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formBlock}>
          <div className={styles.kpiForm}>
            <label id="kpi-label">KPIs (3)</label>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.kpiRow}>
                <input
                  type="text"
                  aria-labelledby="kpi-label"
                  aria-label={`KPI ${i + 1} título`}
                  value={kpis[i].title}
                  onChange={(e) => updateKpi(i, "title", e.target.value)}
                  placeholder="Título del KPI"
                />
                <input
                  type="text"
                  aria-label={`KPI ${i + 1} valor`}
                  value={kpis[i].value}
                  onChange={(e) => updateKpi(i, "value", e.target.value)}
                  placeholder="Valor"
                />
                <input
                  type="text"
                  aria-label={`KPI ${i + 1} tendencia`}
                  value={kpis[i].trend}
                  onChange={(e) => updateKpi(i, "trend", e.target.value)}
                  placeholder="Tendencia (ej. ↑ +12%)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formBlock}>
          <div className={styles.formGroup}>
            <label htmlFor="reasoning">Razonamiento (decisión del OKR)</label>
            <textarea
              id="reasoning"
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="Explica el razonamiento detrás de este OKR..."
              rows={4}
            />
          </div>
        </div>
      </section>

      <section className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2>Vista previa del panel</h2>
          <button type="button" onClick={openPreviewPage} className={styles.previewButton}>
            Abrir vista previa en nueva página
          </button>
        </div>
        <OKRDashboard
          objective={objective}
          period={period}
          kr1={kr1}
          kr2={kr2}
          kpis={kpis}
          reasoning={reasoning}
        />
      </section>
    </div>
  );
}
