import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/custom/Header";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import "./globals.css";
import Container from "@/components/custom/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transactions",
  description: "Log your transactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
