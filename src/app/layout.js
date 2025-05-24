import Header from '@/components/Header';
import './globals.css';


export const metadata = {
  title: "K-SHOP",
  description: "Your favorite online shop",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
