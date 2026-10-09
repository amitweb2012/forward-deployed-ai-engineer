import "./globals.css";

export const metadata = {
  title: "Nexus Knowledge | Enterprise AI",
  description: "A simple enterprise knowledge assistant built with Next.js and FastAPI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
