import SideBar from "@/components/shared/sideBar/SideBar";
import TopBar from "@/components/shared/TopBar/TopBar";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
// Import the new sidebar component

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const t = useTranslations();
  return (
    <main className="min-h-screen w-full ">
      <div className="grid h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <SideBar />
        <div className="flex flex-col w-full h-screen ">
          <TopBar />
          <main className=" overflow-y-auto flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}
