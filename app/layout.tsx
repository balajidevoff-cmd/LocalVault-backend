import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LocalVault',
  description: 'LocalVault JSON Status',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
