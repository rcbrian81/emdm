import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "El Mundo De Mariscos || Mexiacn Food Oceansdie",
  description:
    "Experience the best Mexican Food &  Mariscos in Oceanside, CA. From our famous micheladas to authentic seafood dishes, tacos, and burritos El Mundo de Mariscos offers a refreshing, flavorful dining experience with great music and atmosphere. Visit us today!",
  keywords: "mexican, Oceanside, tacos, micheladas, mariscos, restaurant",
  icons: {
    icon: "/favicon.webp",
  },
  openGraph: {
    title: "El Mundo De be",
    description: "A custom description for social media sharing",
    url: "https://mundodemariscos.com",
    images: [
      {
        url: "/images/favicon.webp",
        alt: "Fish Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CGKCSFQ5D1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CGKCSFQ5D1');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
