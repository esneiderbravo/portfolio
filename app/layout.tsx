import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

const SITE_URL = "https://esneiderbravo.dev";
const TITLE = "Esneider Bravo | Senior Backend Engineer — Python · FastAPI · AWS";
const DESCRIPTION =
  "Senior Software Engineer with 8+ years of expertise in Python, FastAPI, microservices, and AWS. Specialized in scalable fintech platforms, AI-first architectures, and distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Esneider Bravo",
  },
  description: DESCRIPTION,
  keywords: [
    "Senior Backend Engineer",
    "Python Developer",
    "FastAPI",
    "Django",
    "Flask",
    "Microservices",
    "AWS",
    "Full Stack Developer",
    "Fintech Engineer",
    "Systems Architect",
    "AI Integration",
    "LangChain",
    "REST APIs",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "React",
    "Next.js",
    "Remote Developer",
    "Colombia",
  ],
  authors: [{ name: "Esneider Bravo", url: SITE_URL }],
  creator: "Esneider Bravo",
  publisher: "Esneider Bravo",
  alternates: { canonical: SITE_URL },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Esneider Bravo Portfolio",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Esneider Bravo — Senior Backend Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@esneiderbravo",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Esneider Bravo",
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Senior Backend Engineer",
  description: DESCRIPTION,
  sameAs: ["https://github.com/esneiderbravo", "https://linkedin.com/in/esneider-bravo"],
  knowsAbout: ["Python", "FastAPI", "Microservices", "AWS", "React", "Next.js", "AI", "Fintech", "LangChain"],
  worksFor: { "@type": "Organization", name: "LendingFront" },
  address: { "@type": "PostalAddress", addressLocality: "Santa Marta", addressCountry: "CO" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Esneider Bravo Portfolio",
  url: SITE_URL,
  description: "Portfolio of Esneider Bravo — Senior Backend Engineer specialized in Python, FastAPI, AWS, and AI-first architectures.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href={SITE_URL} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
