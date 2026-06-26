import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Providers from "./providers";

export const metadata = {
  title: "Hubbie Chat",
  description: "A premium real-time messaging application.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
