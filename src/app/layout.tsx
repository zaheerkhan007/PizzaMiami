import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import {CartProvider} from '@/lib/cart-context';
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pizza Miami | Fresh Pizza & Grill – Liverpool',
  description:
    "Pizza Miami – Liverpool's finest pizza, peri peri chicken, burgers, kebabs and more. Order online for cash on delivery. Open 3pm–3am daily.",
  keywords:
    'pizza liverpool, pizza miami, peri peri chicken, burgers liverpool, kebab liverpool, food delivery liverpool',
  icons: {
    icon: '/favicon.ico',
    apple: '/PizzaLogo.png',
  },
  openGraph: {
    title: 'Pizza Miami | Fresh Pizza & Grill',
    description:
      'Order the best pizza, peri peri chicken, burgers and more in Liverpool.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}
