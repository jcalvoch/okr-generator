import "./globals.css";

export const metadata = {
  title: "OKR Generator",
  description: "Generador de OKRs con objetivo, resultados clave, KPIs y razonamiento de Evolución Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
