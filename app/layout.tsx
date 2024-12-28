import type { Metadata } from 'next';
import {
  ClerkProvider,

} from '@clerk/nextjs';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Rsai Leaderboard Dec-2024',
  description: 'Created by Technolize Pvt',
};

<link rel="icon" href="/favicon.ico" sizes="any" />;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={` antialiased`}>
          {children} <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
