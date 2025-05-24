import Header from '@/components/Header';
import './globals.css';


export const metadata = {
  title: "K-SHOP",
  description: "Your favorite online shop",
  icons: {
    icon: "/icon.ico",
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
