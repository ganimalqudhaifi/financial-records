import Script from "next/script";
import AuthContextProvider from "@/app/AuthContextProvider";
import StoreProvider from "./StoreProvider";
import "./globals.css";

const themeInitScript = `
(function () {
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;

    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-screen bg-slate-50 font-plex text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <StoreProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
