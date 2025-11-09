import "./../styles/globals.css";

export const metadata = {
  title: "NeuraCore AI",
  description: "Where AI meets human intelligence."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
