"use client";

import styles from "./page.module.css";

function progressPercent(actual, meta, inicio) {
  if (inicio === meta) return 0;
  const range = meta - inicio;
  const current = actual - inicio;
  return Math.min(100, Math.max(0, Math.round((current / range) * 100)));
}

function progressStatus(pct) {
  if (pct < 40) return "red";
  if (pct < 70) return "yellow";
  return "green";
}

const kpiIcons = [
  <svg key="chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  <svg key="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
];

export default function OKRDashboard({
  objective = "",
  period = "",
  kr1 = { description: "", actual: 0, meta: 0, inicio: 0 },
  kr2 = { description: "", actual: 0, meta: 0, inicio: 0 },
  kpis = [],
  reasoning = "",
}) {
  const kr1Progress = progressPercent(kr1.actual, kr1.meta, kr1.inicio);
  const kr2Progress = progressPercent(kr2.actual, kr2.meta, kr2.inicio);
  const kr1Status = progressStatus(kr1Progress);
  const kr2Status = progressStatus(kr2Progress);

  return (
    <div className={styles.dashboard}>
      <div className={styles.cardObjective}>
        <div className={styles.cardLabel}>
          <span className={styles.iconObjective} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </span>
          OBJETIVO
        </div>
        <p className={styles.objectiveText}>{objective || "—"}</p>
        <p className={styles.period}>
          <span className={styles.calendarIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </span>
          {period || "—"}
        </p>
      </div>

      <div className={styles.krRow}>
        <div className={styles.cardKR}>
          <div className={styles.cardLabel}>
            <span className={`${styles.statusDot} ${styles[`statusDot${kr1Status.charAt(0).toUpperCase() + kr1Status.slice(1)}`]}`} aria-hidden />
            RESULTADO CLAVE 1
          </div>
          <p className={styles.krDescription}>{kr1.description || "—"}</p>
          <div className={styles.progressBlock}>
            <span>Progreso</span>
            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}>
                <div
                  className={`${styles.progressBar} ${styles[`progressBarStatus${kr1Status.charAt(0).toUpperCase() + kr1Status.slice(1)}`]}`}
                  style={{ width: `${kr1Progress}%` }}
                />
              </div>
              <span className={`${styles.progressPct} ${styles[`progressPctStatus${kr1Status.charAt(0).toUpperCase() + kr1Status.slice(1)}`]}`}>{kr1Progress}%</span>
            </div>
            <p className={styles.metaLine}>
              Actual: {kr1.actual} · Meta: {kr1.meta} · Inicio: {kr1.inicio}
            </p>
          </div>
        </div>
        <div className={styles.cardKR}>
          <div className={styles.cardLabel}>
            <span className={`${styles.statusDot} ${styles[`statusDot${kr2Status.charAt(0).toUpperCase() + kr2Status.slice(1)}`]}`} aria-hidden />
            RESULTADO CLAVE 2
          </div>
          <p className={styles.krDescription}>{kr2.description || "—"}</p>
          <div className={styles.progressBlock}>
            <span>Progreso</span>
            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}>
                <div
                  className={`${styles.progressBar} ${styles[`progressBarStatus${kr2Status.charAt(0).toUpperCase() + kr2Status.slice(1)}`]}`}
                  style={{ width: `${kr2Progress}%` }}
                />
              </div>
              <span className={`${styles.progressPct} ${styles[`progressPctStatus${kr2Status.charAt(0).toUpperCase() + kr2Status.slice(1)}`]}`}>{kr2Progress}%</span>
            </div>
            <p className={styles.metaLine}>
              Actual: {kr2.actual} · Meta: {kr2.meta} · Inicio: {kr2.inicio}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.kpiCards}>
        {(kpis.length ? kpis : [{ title: "", value: "", trend: "" }, { title: "", value: "", trend: "" }, { title: "", value: "", trend: "" }]).slice(0, 3).map((kpi, i) => {
          const t = (kpi.trend || "").trim();
          const trendUp = t.startsWith("↑");
          const trendDown = t.startsWith("↓");
          const trendClass = trendUp ? styles.kpiTrendPositive : trendDown ? styles.kpiTrendNegative : styles.kpiTrendNeutral;
          return (
            <div key={i} className={styles.cardKPI}>
              <span className={styles.kpiIcon} aria-hidden>{kpiIcons[i]}</span>
              <p className={styles.kpiTitle}>{kpi.title || "—"}</p>
              <p className={styles.kpiValue}>{kpi.value || "—"}</p>
              <p className={`${styles.kpiTrend} ${trendClass}`}>{kpi.trend || "—"}</p>
              <div className={styles.miniChart}>
                {[65, 80, 60, 90, 72, 85].map((h, j) => (
                  <div key={j} className={styles.miniBar} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.cardReasoning}>
        <div className={styles.cardLabel}>Razonamiento (decisión del OKR)</div>
        <p className={styles.reasoningText}>
          {reasoning || "Añade tu razonamiento arriba."}
        </p>
      </div>
    </div>
  );
}
