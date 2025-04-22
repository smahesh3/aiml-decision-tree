import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIML Solution Finder',
  description: 'Find the perfect AI/ML solution for your needs using our interactive decision tree',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 