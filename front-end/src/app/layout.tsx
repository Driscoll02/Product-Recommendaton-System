"use client";
import "./globals.css";
import Header from "./_components/organisms/Header";
import { Montserrat } from "next/font/google";
import { store } from "./store/store";
import { Provider } from "react-redux";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased mx-40`}>
        <Provider store={store}>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
