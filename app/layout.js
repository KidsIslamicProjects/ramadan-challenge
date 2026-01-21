import "./globals.css";
import BottomNav from "./components/BottomNavbar";
import InstallPrompt from "./components/InstallPrompt";
export const metadata = {
  title: "تحدي مأرب الرّمضاني",
  description:
    "تحدّي رمضاني يهدُف إلى تنظيم الوقت وزيادة الفعالية خلال شهر رمضان المبارك",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <InstallPrompt />
        <BottomNav />
      </body>
    </html>
  );
}
