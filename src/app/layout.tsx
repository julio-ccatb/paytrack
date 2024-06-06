import { GeistSans } from "geist/font/sans";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "./_components/providers/themeProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Julio Castaño",
  description: "Personal portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <body
        className={cn(
          " min-h-screen bg-background font-sans leading-relaxed antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            {" "}
            <div vaul-drawer-wrapper="" className="bg-background">
              {children}
              <Toaster />
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
