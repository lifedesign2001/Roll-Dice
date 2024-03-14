import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Roll Dice",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json"/>
        
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="application-name" content="Roll Dice"/>
        <meta name="apple-mobile-web-app-title" content="Roll Dice"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="msapplication-navbutton-color" content="#ffffff"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="msapplication-starturl" content="/"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <link rel="icon" type="image/png" sizes="192x192" href="/appicon/icon_192x192.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/appicon/icon_192x192.png"/>
        <link rel="icon" type="image/png" sizes="168x168" href="/appicon/icon_168x168.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="168x168" href="/appicon/icon_168x168.png"/>
        <link rel="icon" type="image/png" sizes="144x144" href="/appicon/icon_144x144.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/appicon/icon_144x144.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/appicon/icon_96x96.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="96x96" href="/appicon/icon_96x96.png"/>
        <link rel="icon" type="image/png" sizes="72x72" href="/appicon/icon_72x72.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/appicon/icon_72x72.png"/>
        <link rel="icon" type="image/png" sizes="48x48" href="/appicon/icon_48x48.png"/>
        <link rel="apple-touch-icon" type="image/png" sizes="48x48" href="/appicon/icon_48x48.png"/>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
