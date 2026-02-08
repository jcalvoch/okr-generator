import "./globals.css";

export const metadata = {
  title: "OKR Generator",
  description: "Generate and preview OKRs with objectives, key results, KPIs and reasoning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
