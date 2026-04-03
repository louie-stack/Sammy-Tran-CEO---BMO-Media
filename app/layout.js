import "./globals.css";
import OooPattern from "../components/OooPattern";

export const metadata = {
  title: "BMO Media | AI OS",
  description: "Sammy Tran — CEO Command Centre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#0D0D0D", fontFamily: "'Inter', sans-serif" }}>
        <OooPattern />
        {children}
      </body>
    </html>
  );
}


