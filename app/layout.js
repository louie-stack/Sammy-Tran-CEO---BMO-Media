import "./globals.css";

export const metadata = {
  title: "BMO Media | AI OS",
  description: "Sammy Tran — CEO Command Centre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#0D0D0D", fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}


