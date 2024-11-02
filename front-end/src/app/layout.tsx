import "./globals.css";
import Header from "./_components/organisms/Header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased mx-40`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
