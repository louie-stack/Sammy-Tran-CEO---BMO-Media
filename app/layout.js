import "./globals.css";
import Nav from "../components/Nav";

export const metadata = {
  title: "BMO Media — AI OS",
  description: "Sammy Tran | CEO Command Centre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0d14", color: "#e2e8f0", display: "flex" }}>
        <Nav />
        <main style={{ marginLeft: "240px", minHeight: "100vh", flex: 1, position: "relative", zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
