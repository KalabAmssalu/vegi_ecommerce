import { siteConfig } from "@/app";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  // useTranslations works both on the server and client;
  // we only need the getTranslations on async functions.
  const t = await getTranslations();

  const metadata: Metadata = {
    title: `${t("metadata.title.home")} - ${siteConfig.appNameDesc}`,
  };

  return metadata;
}
export default function RootPage() {
  redirect("/en-US/auth/sign-in");
}
