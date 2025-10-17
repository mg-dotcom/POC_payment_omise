// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Omise Payment POC',
  description: 'ทดสอบระบบชำระเงิน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        {/* โหลด Omise Script */}
        <Script 
          src="https://cdn.omise.co/omise.js" 
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}