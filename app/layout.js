import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  metadataBase: new URL("https://www.xphm.fun"),
  title: "XPhantom | Privacy-First AI Orchestration",
  description:
    "Deploy privacy-preserving AI agents for sensitive tasks. ZK coordination, TEE-protected memory, and anonymous payments for RWA valuation, on-chain due diligence, and confidential data processing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "XPhantom | Privacy-First AI Orchestration",
    description:
      "A Solana token project site with Phantom wallet payments, live CA publishing, and a hidden launch admin.",
    url: "https://www.xphm.fun/",
    siteName: "XPhantom",
    images: [
      {
        url: "/xphantom-logo.png",
        width: 768,
        height: 768,
        alt: "XPhantom logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "XPhantom | Privacy-First AI Orchestration",
    description:
      "A Solana token project site with Phantom wallet payments, live CA publishing, and a hidden launch admin.",
    images: ["/xphantom-logo.png"],
  },
  icons: {
    icon: "/xphantom-logo.png",
    apple: "/xphantom-logo.png",
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
