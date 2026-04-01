import "./globals.css";
import ParticleField from "../components/ParticleField";

export const metadata = {
  title: "BMO Media | AI OS",
  description: "Sammy Tran — CEO Command Centre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#080B12" }}>
        <ParticleField />
        {children}
      </body>
    </html>
  );
}
