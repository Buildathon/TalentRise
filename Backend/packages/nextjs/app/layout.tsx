// app/layout.tsx
import "@rainbow-me/rainbowkit/styles.css";
import "~~/styles/globals.css";

import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "TalentRise",
  description: "Descubre y apoya a los mejores talentos del mundo. Conecta, invierte y crece junto a ellos.",
  icons: {
    icon: "/logo.svg",
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <link
        href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <body className="bg-clientLightPrimary dark:bg-clientDarkPrimary transition-colors duration-300 font-roboto">
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
