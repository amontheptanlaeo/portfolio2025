import "./globals.css";


export const metadata = {
  title: "Amonthep Tanlaeo",
  description: "Amonthep.T Portfolio 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
