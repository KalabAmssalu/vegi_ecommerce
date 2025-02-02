import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";

// Define the type for the metadata function's parameter
const myFont = localFont({
  src: "../../../public/fonts/NotoSerifEthiopic-VariableFont_wdth,wght.ttf",
});

const fontSans = localFont({
  src: "../../../public/fonts/FiraSans-Regular.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "400",
});

const fontMono = localFont({
  src: "../../../public/fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

// Chromium browsers flags emojis fix
const fontFlag = localFont({
  display: "auto",
  src: "../../../public/fonts/Twemoji-Flags.woff2",
  variable: "--font-twemoji",
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
      <body className={myFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
