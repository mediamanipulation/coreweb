import "../styles/globals.css";

import NavBar from "./components/NavBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />   {/* ✅ persistent */}
        {children}
      </body>
    </html>
  );
}
