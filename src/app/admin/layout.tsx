import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - AIML Solution Finder',
  description: 'Admin dashboard for managing the AIML decision tree',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">AIML Solution Finder Admin</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 