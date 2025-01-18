import AuthContextProvider from "@/context/AuthContext";
import "@/styles/globals.css";
import StoreProvider from "./StoreProvider";

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
