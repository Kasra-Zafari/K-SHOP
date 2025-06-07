import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { CartProvider } from '@/app/context/CartContext';

export const metadata = {
  title: 'K-SHOP',
  description: 'Your favorite online shop',
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}