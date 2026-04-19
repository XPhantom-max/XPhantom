import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "XPhantom | Privacy-First AI Orchestration",
  description:
    "Deploy privacy-preserving AI agents for sensitive tasks. ZK coordination, TEE-protected memory, and anonymous payments for RWA valuation, on-chain due diligence, and confidential data processing.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
