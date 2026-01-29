import "./globals.css";
import BottomNav from "./components/BottomNavbar";
import InstallPrompt from "./components/InstallPrompt";

export const metadata = {
  title: "مساقات علميّة للصغار",
  description: "Description here",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body>
        {children}
        {/* <InstallPrompt /> */}
        <BottomNav />
      </body>
    </html>
  );
}
