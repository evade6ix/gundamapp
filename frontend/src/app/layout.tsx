import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Gundam TCG Database",
  description: "Search and view Gundam TCG cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <header className="bg-gray-800 p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Gundam TCG
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">
                Search
              </Link>
              {/* Future: Add more nav links here */}
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto py-6">{children}</main>
        <footer className="text-center text-gray-500 py-4">
          &copy; 2025 Gundam TCG Database
        </footer>
      </body>
    </html>
  );
}
