import type { Metadata } from 'next';
import '../styles/globals.css';
import { ErrorSuppressor } from '@/components/common/error-suppressor';

export const metadata: Metadata = {
  title: 'Dodo Platform Console | Owner CMS',
  description: 'Dodo Fee Platform - Standalone Owner CMS Dashboard for institutional governance, commercial billing, subscriptions, and payment rails.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <ErrorSuppressor />
        {children}
      </body>
    </html>
  );
}
