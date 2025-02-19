"use client";
import "./globals.css";
import Header from "./_components/organisms/Header";
import { Montserrat } from "next/font/google";
import { store } from "./store/store";
import { Provider } from "react-redux";
import LLMChat from "./_components/molecules/LLMChat";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Provider store={store}>
          <Header />
          <main>
            {children}
            <LLMChat />
          </main>
        </Provider>
      </body>
    </html>
  );
}
