import AuthContextProvider from "@/context/AuthContext";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AuthContextProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </AuthContextProvider>
    </StoreProvider>
  );
}
