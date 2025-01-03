import { Navigation } from '@/components/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RSAI Cube Competitions Admin',
  description: 'Admin dashboard for managing RSAI Cube Competitions',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto p-8">{children}</main>
    </div>
  );
}
