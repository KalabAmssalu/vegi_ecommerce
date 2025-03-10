import localFont from "next/font/local";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";

import StoreProvider from "@/providers/Store-provider";
import QueryProviders from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// Define the type for the metadata function's parameter
const myFont = localFont({
  src: "../../../public/fonts/NotoSerifEthiopic-VariableFont_wdth,wght.ttf",
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚙️</text></svg>"
        ></link>
      </head>
      <body className={myFont.className}>
        <QueryProviders>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider messages={messages}>
                {children}
                <Toaster position="bottom-right" />
              </NextIntlClientProvider>
            </ThemeProvider>
          </StoreProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
