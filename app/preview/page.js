"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import PreviewView from "../PreviewView";
import { getDefaultPreviewData, getDefaultPivotes } from "../okrDefaults";

const STORAGE_KEY = "okr-preview-data";
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

export default function PreviewPage() {
  const [pivotes, setPivotes] = useState(() => getDefaultPivotes(3));
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      const list = data.pivotes && Array.isArray(data.pivotes)
        ? data.pivotes.map(normalizePivot)
        : [normalizePivot(data)];
      setPivotes(list);
    } catch (_) {
      setPivotes(getDefaultPivotes(3));
    }
  }, []);

  return (
    <PreviewView
      pivotes={pivotes}
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      showBackToGenerator={true}
      styles={styles}
    />
  );
}
