export const defaultPreviewTitle = "Objetivo de Innovación Centrada con el Cliente";
export const defaultObjective = "Integrar la co-creación con clientes como práctica estándar en todo el ciclo de vida de desarrollo de producto para el valor entregado";
export const defaultPeriod = "2025 | Enero - Diciembre";
export const defaultKR1 = {
  description: "Identificar y validar al menos 20 puntos de dolor que se traduzcan en requisitos de producto",
  actual: 14,
  meta: 20,
  inicio: 5,
};
export const defaultKR2 = {
  description: "Co-diseñar y probar prototipos con al menos 5 clientes por trimestre",
  actual: 4,
  meta: 5,
  inicio: 0,
};
export const defaultKPIs = [
  { title: "Porcentaje de nuevas iniciativas que incluyen involucramiento del cliente", value: "60%", trend: "↑ +5% vs mes anterior" },
  { title: "Tiempo promedio desde insight → requisito documentado", value: "35 días", trend: "↑ +12% vs mes anterior" },
  { title: "Net Promoter Score (NPS) en productos nuevos", value: "6.5/8", trend: "↑ +0.3 vs mes anterior" },
];
export const defaultReasoning = `KR1: Durante la co-creación con el cliente es de vital importancia conocer cuáles son las partes en los procesos u operaciones de nuestros clientes donde podríamos aliviar esos problemas a través de productos. Estos puntos de dolor identificados tienen que ser accionables y relevantes para las capacidades de Huawei, por lo que es importante especificar que estos tienen que llevar a la creación de un requisito de producto.

KR2: Para una verdadera co-creación, el cliente no solamente requiere establecer puntos de dolor, sino que el cliente también necesita confirmar que el método para aliviar estos a través de un producto vaya a ser efectivo por lo que se mide la capacidad de obtener retroalimentación del cliente durante la fase de diseño y luego al momento de lanzar un prototipo.`;

export function getDefaultPreviewData() {
  return {
    previewPageTitle: defaultPreviewTitle,
    objective: defaultObjective,
    period: defaultPeriod,
    kr1: defaultKR1,
    kr2: defaultKR2,
    kpis: defaultKPIs,
    reasoning: defaultReasoning,
  };
}
