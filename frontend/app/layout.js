import { Urbanist } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { store } from "@/redux/store";
import ReduxProvider from "@/providers/ReduxProvider";

import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Celestial",
  description: "On-chain Non-Custodial Wallet",
  icons: {
    shortcut: [{ url: "/favicon.ico", sizes: "16x16", type: "image/ico" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ReduxProvider store={store}>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontFamily: urbanist.fontFamily,
                background: "#333",
                color: "#fff",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#333",
              },
            }}
          />

          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
