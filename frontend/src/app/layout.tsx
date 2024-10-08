import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { Quicksand } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const roboto = Quicksand({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "GenaiX project",
  description: "Made for GenAIX hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
