"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import OKRDashboard from "../OKRDashboard";
import {
  getDefaultPreviewData,
  getDefaultPivotes,
  PIVOTE_NAMES,
} from "../okrDefaults";

const STORAGE_KEY = "okr-preview-data";
const MAX_PIVOTES = 6;
const defaultKr3 = { description: "", actual: 0, meta: 0, inicio: 0 };

function normalizePivot(p) {
  return {
    ...getDefaultPreviewData(),
    ...p,
    kr1: p.kr1 ?? { description: "", actual: 0, meta: 0, inicio: 0 },
    kr2: p.kr2 ?? { description: "", actual: 0, meta: 0, inicio: 0 },
    kr3: p.kr3 ?? defaultKr3,
    kpis: Array.isArray(p.kpis) ? p.kpis : [],
    reasoning: p.reasoning ?? "",
  };
}

export default function GeneradorPage() {
  const router = useRouter();
  const [numPivotes, setNumPivotesState] = useState(3);
  const [pivotes, setPivotes] = useState(() => getDefaultPivotes(3));

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      const list = data.pivotes && Array.isArray(data.pivotes)
        ? data.pivotes.map(normalizePivot)
        : [normalizePivot(data)];
      if (list.length >= 1 && list.length <= MAX_PIVOTES) {
        setNumPivotesState(list.length);
        setPivotes(list);
      }
    } catch (_) {
      /* keep default state */
    }
  }, []);
  const [activePivotIndex, setActivePivotIndex] = useState(0);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  const setNumPivotes = useCallback((n) => {
    const count = Math.min(MAX_PIVOTES, Math.max(1, Number(n) || 1));
    setNumPivotesState(count);
    setPivotes((prev) => {
      if (count > prev.length) {
        const toAdd = count - prev.length;
        return [
          ...prev,
          ...Array.from({ length: toAdd }, (_, j) => ({
            ...getDefaultPreviewData(),
            previewPageTitle: PIVOTE_NAMES[prev.length + j] ?? `Pivote ${prev.length + j + 1}`,
          })),
        ];
      }
      if (count < prev.length) return prev.slice(0, count);
      return prev;
    });
    setActivePivotIndex((i) => Math.min(i, count - 1));
    setActivePreviewIndex((i) => Math.min(i, count - 1));
  }, []);

  const openPreviewPage = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ pivotes }));
      router.push("/preview");
    }
  };

  const p = pivotes[activePivotIndex];
  if (!p) return null;

  const updatePivot = (field, value) => {
    setPivotes((prev) => {
      const next = [...prev];
      next[activePivotIndex] = { ...next[activePivotIndex], [field]: value };
      return next;
    });
  };

  const updatePivotKr = (krKey, krField, value) => {
    setPivotes((prev) => {
      const next = [...prev];
      const kr = next[activePivotIndex][krKey];
      next[activePivotIndex] = {
        ...next[activePivotIndex],
        [krKey]: { ...kr, [krField]: value },
      };
      return next;
    });
  };

  const updatePivotKpi = (index, field, value) => {
    setPivotes((prev) => {
      const next = [...prev];
      const kpis = [...next[activePivotIndex].kpis];
      kpis[index] = { ...kpis[index], [field]: value };
      next[activePivotIndex] = { ...next[activePivotIndex], kpis };
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Generador de OKR</h1>
        <p>Completa tu objetivo, resultados clave, KPIs y razonamiento por pivote. La vista previa se actualiza abajo.</p>
      </header>

      <section className={styles.formSection}>
        <h2>Datos</h2>

        <div className={styles.pivotCountSelect}>
          <label htmlFor="numPivotes">Número de pivotes (1 a 6)</label>
          <select
            id="numPivotes"
            value={numPivotes}
            onChange={(e) => setNumPivotes(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "pivote" : "pivotes"}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pivotTabs}>
          {pivotes.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.pivotTab} ${i === activePivotIndex ? styles.pivotTabActive : ""}`}
              onClick={() => setActivePivotIndex(i)}
            >
              {PIVOTE_NAMES[i] ?? `Pivote ${i + 1}`}
            </button>
          ))}
        </div>

        <div className={styles.formBlock}>
          <div className={styles.formGroup}>
            <label htmlFor="previewTitle">Título de la vista previa</label>
            <input
              id="previewTitle"
              type="text"
              value={p.previewPageTitle}
              onChange={(e) => updatePivot("previewPageTitle", e.target.value)}
              placeholder="ej. Objetivo de Innovación Centrada con el Cliente"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="objective">Objetivo</label>
            <input
              id="objective"
              type="text"
              value={p.objective}
              onChange={(e) => updatePivot("objective", e.target.value)}
              placeholder="ej. Aumentar la satisfacción y retención de clientes"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="period">Período</label>
            <input
              id="period"
              type="text"
              value={p.period}
              onChange={(e) => updatePivot("period", e.target.value)}
              placeholder="ej. Q1 2026 | Enero - Marzo"
            />
          </div>
        </div>

        <div className={styles.formBlock}>
          <div className={styles.formRowThree}>
            <div className={styles.formGroup}>
              <label htmlFor="kr1-desc">Resultado clave 1</label>
              <input
                id="kr1-desc"
                type="text"
                value={p.kr1.description}
                onChange={(e) => updatePivotKr("kr1", "description", e.target.value)}
                placeholder="Descripción"
              />
              <div className={styles.inlineInputs}>
                <input
                  type="number"
                  aria-label="KR1 Actual"
                  value={p.kr1.actual}
                  onChange={(e) => updatePivotKr("kr1", "actual", +e.target.value)}
                  placeholder="Actual"
                />
                <input
                  type="number"
                  aria-label="KR1 Meta"
                  value={p.kr1.meta}
                  onChange={(e) => updatePivotKr("kr1", "meta", +e.target.value)}
                  placeholder="Meta"
                />
                <input
                  type="number"
                  aria-label="KR1 Inicio"
                  value={p.kr1.inicio}
                  onChange={(e) => updatePivotKr("kr1", "inicio", +e.target.value)}
                  placeholder="Inicio"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="kr2-desc">Resultado clave 2</label>
              <input
                id="kr2-desc"
                type="text"
                value={p.kr2.description}
                onChange={(e) => updatePivotKr("kr2", "description", e.target.value)}
                placeholder="Descripción"
              />
              <div className={styles.inlineInputs}>
                <input
                  type="number"
                  aria-label="KR2 Actual"
                  value={p.kr2.actual}
                  onChange={(e) => updatePivotKr("kr2", "actual", +e.target.value)}
                  placeholder="Actual"
                />
                <input
                  type="number"
                  aria-label="KR2 Meta"
                  value={p.kr2.meta}
                  onChange={(e) => updatePivotKr("kr2", "meta", +e.target.value)}
                  placeholder="Meta"
                />
                <input
                  type="number"
                  aria-label="KR2 Inicio"
                  value={p.kr2.inicio}
                  onChange={(e) => updatePivotKr("kr2", "inicio", +e.target.value)}
                  placeholder="Inicio"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="kr3-desc">Resultado clave 3</label>
              <input
                id="kr3-desc"
                type="text"
                value={p.kr3.description}
                onChange={(e) => updatePivotKr("kr3", "description", e.target.value)}
                placeholder="Descripción"
              />
              <div className={styles.inlineInputs}>
                <input
                  type="number"
                  aria-label="KR3 Actual"
                  value={p.kr3.actual}
                  onChange={(e) => updatePivotKr("kr3", "actual", +e.target.value)}
                  placeholder="Actual"
                />
                <input
                  type="number"
                  aria-label="KR3 Meta"
                  value={p.kr3.meta}
                  onChange={(e) => updatePivotKr("kr3", "meta", +e.target.value)}
                  placeholder="Meta"
                />
                <input
                  type="number"
                  aria-label="KR3 Inicio"
                  value={p.kr3.inicio}
                  onChange={(e) => updatePivotKr("kr3", "inicio", +e.target.value)}
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
                  value={p.kpis[i].title}
                  onChange={(e) => updatePivotKpi(i, "title", e.target.value)}
                  placeholder="Título del KPI"
                />
                <input
                  type="text"
                  aria-label={`KPI ${i + 1} valor`}
                  value={p.kpis[i].value}
                  onChange={(e) => updatePivotKpi(i, "value", e.target.value)}
                  placeholder="Valor"
                />
                <input
                  type="text"
                  aria-label={`KPI ${i + 1} tendencia`}
                  value={p.kpis[i].trend}
                  onChange={(e) => updatePivotKpi(i, "trend", e.target.value)}
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
              value={p.reasoning}
              onChange={(e) => updatePivot("reasoning", e.target.value)}
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
        {pivotes.length >= 2 && (
          <div className={styles.pivotTabs}>
            {pivotes.map((pivote, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.pivotTab} ${i === activePreviewIndex ? styles.pivotTabActive : ""}`}
                onClick={() => setActivePreviewIndex(i)}
              >
                {pivote.previewPageTitle || PIVOTE_NAMES[i] || `Pivote ${i + 1}`}
              </button>
            ))}
          </div>
        )}
        <div className={styles.dashboardBlock}>
          {pivotes.length >= 1 && (() => {
            const pivote = pivotes[activePreviewIndex] ?? pivotes[0];
            return (
              <OKRDashboard
                objective={pivote.objective}
                period={pivote.period}
                kr1={pivote.kr1}
                kr2={pivote.kr2}
                kr3={pivote.kr3}
                kpis={pivote.kpis}
                reasoning={pivote.reasoning}
              />
            );
          })()}
        </div>
      </section>
    </div>
  );
}
