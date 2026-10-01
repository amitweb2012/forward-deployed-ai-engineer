import "./globals.css";

export const metadata = {
  title: "Enterprise AI Knowledge Assistant",
  description: "Next.js frontend for a Python FastAPI RAG application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
