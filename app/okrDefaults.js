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
export const defaultKR3 = {
  description: "Publicar al menos 2 casos de éxito de co-creación con clientes",
  actual: 1,
  meta: 2,
  inicio: 0,
};
export const PIVOTE_NAMES = [
  "Alineamiento Estratégico",
  "Cultura y Liderazgo Digital",
  "Innovación Centrada en el Cliente",
  "Agilidad Operativa",
  "Acceso y Uso de Datos",
  "Ecosistemas Colaborativos",
];
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
    kr3: defaultKR3,
    kpis: defaultKPIs,
    reasoning: defaultReasoning,
  };
}

const defaultPeriodRAPS = "2025 | Enero - Diciembre";

const RAPS_PIVOTES = [
  {
    previewPageTitle: PIVOTE_NAMES[0],
    objective: "Alinear la estrategia digital de RAPS con el segmento DeliCo y la oferta myRAzept para priorizar objetivos de negocio y la coordinación TI–marketing–ventas",
    period: defaultPeriodRAPS,
    kr1: {
      description: "Aumentar el porcentaje de carniceros DeliCo que usan al menos una función de myRAzept del 8% al 15% para diciembre 2025",
      actual: 10,
      meta: 15,
      inicio: 8,
    },
    kr2: {
      description: "Reducir el tiempo promedio desde el lanzamiento de una función hasta su adopción por 100 clientes de 12 semanas a 8 semanas para fin de año",
      actual: 9,
      meta: 8,
      inicio: 12,
    },
    kr3: {
      description: "Alcanzar que el 100% de las recetas DeliCo en ERP tengan etiquetado automático disponible en myRAzept para diciembre 2025",
      actual: 85,
      meta: 100,
      inicio: 60,
    },
    kpis: [
      { title: "Porcentaje de carniceros DeliCo con al menos una función de myRAzept en uso", value: "10%", trend: "↑ +2% vs trimestre anterior" },
      { title: "Satisfacción (NPS) de clientes con la alineación oferta–necesidades", value: "6.8/10", trend: "↑ +0.4 vs mes anterior" },
      { title: "Cobertura de recetas con etiquetado automático disponible", value: "85%", trend: "↑ +5% vs mes anterior" },
    ],
    reasoning: "El alineamiento entre la estrategia digital de RAPS, el segmento DeliCo y la oferta myRAzept permite priorizar funciones (etiquetado, recetas, pedidos) y coordinar TI, marketing y ventas. Los KRs miden adopción (leading), tiempo hasta valor (outcome) y cobertura de valor (cumplimiento normativo).",
  },
  {
    previewPageTitle: PIVOTE_NAMES[1],
    objective: "Impulsar la adopción interna y el liderazgo digital en RAPS: apoyo del CEO, formación de ventas y servicio al cliente, rol de especialista digital y colaboración entre departamentos",
    period: defaultPeriodRAPS,
    kr1: {
      description: "Alcanzar que el 100% de la fuerza de ventas haya completado la capacitación en myRAzept para diciembre 2025",
      actual: 85,
      meta: 100,
      inicio: 30,
    },
    kr2: {
      description: "Aumentar el NPS interno sobre iniciativas digitales de 5.5 a 7.0 para diciembre 2025",
      actual: 6.2,
      meta: 7,
      inicio: 5.5,
    },
    kr3: {
      description: "Reducir el tiempo desde solicitud de soporte digital hasta primera respuesta a 4 horas para fin de año",
      actual: 5,
      meta: 4,
      inicio: 24,
    },
    kpis: [
      { title: "Porcentaje de fuerza de ventas capacitada en myRAzept", value: "85%", trend: "↑ +10% vs trimestre anterior" },
      { title: "NPS interno sobre iniciativas digitales", value: "6.2/10", trend: "↑ +0.5 vs mes anterior" },
      { title: "Tiempo promedio hasta primera respuesta (soporte digital)", value: "5 h", trend: "↓ -2 h vs mes anterior" },
    ],
    reasoning: "La cultura y el liderazgo digital en RAPS se reflejan en el apoyo explícito del CEO, la formación de ventas y servicio al cliente para promover myRAzept, el rol de asesor especialista digital y la colaboración entre TI, marketing y otros departamentos. Los KRs miden cobertura de formación (leading), clima interno (outcome) y calidad de soporte (outcome).",
  },
  {
    previewPageTitle: PIVOTE_NAMES[2],
    objective: "Ampliar la propuesta de valor para carniceros con myRAzept (etiquetado, recetas, pedidos) y diferenciar a RAPS frente a competidores en el comercio de carnicería",
    period: defaultPeriodRAPS,
    kr1: {
      description: "Aumentar los usuarios activos mensuales de myRAzept de 400 a 1.150 para diciembre 2025",
      actual: 820,
      meta: 1150,
      inicio: 400,
    },
    kr2: {
      description: "Aumentar el NPS de carniceros usuarios de la app de 6.0 a 7.5 para fin de año",
      actual: 6.8,
      meta: 7.5,
      inicio: 6,
    },
    kr3: {
      description: "Aumentar el porcentaje de pedidos DeliCo realizados por myRAzept del 0% al 15% para diciembre 2025",
      actual: 9,
      meta: 15,
      inicio: 0,
    },
    kpis: [
      { title: "Usuarios activos mensuales en myRAzept", value: "820", trend: "↑ +120 vs mes anterior" },
      { title: "Net Promoter Score (NPS) de carniceros usuarios de la app", value: "6.8/10", trend: "↑ +0.3 vs trimestre anterior" },
      { title: "Porcentaje de pedidos DeliCo realizados por myRAzept", value: "9%", trend: "↑ +2% vs mes anterior" },
    ],
    reasoning: "La innovación centrada en el cliente se traduce en valor concreto para carniceros: etiquetado normativo, gestión de recetas y pedidos digitales. Los KRs reflejan adopción (usuarios activos, dato del caso), satisfacción (NPS) y uso del canal digital (leading frente a ingresos). RAPS se posiciona como proveedor de soluciones digitales en una industria tradicionalmente no digital.",
  },
];

export function getDefaultPivotes(count) {
  if (count === 3) {
    return RAPS_PIVOTES.map((p) => ({ ...p }));
  }
  const names = PIVOTE_NAMES;
  return Array.from({ length: count }, (_, i) => ({
    ...getDefaultPreviewData(),
    previewPageTitle: names[i] != null ? names[i] : `Pivote ${i + 1}`,
  }));
}
