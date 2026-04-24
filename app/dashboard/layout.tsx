import { UserSessionProvider } from "@/context/UserSessionContext";

import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { prisma } from "@/lib/prisma";

export default async function DbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Busca a foto do banco primeiro, senão usa a do provedor (Google)
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { urlImage: true },
  });

  const user = {
    email: session.user.email,
    name: session.user.name,
    image: dbUser?.urlImage || session.user.image || "",
  };

  return (
    <main>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant='inset' user={user} />
        <SidebarInset>
          <SiteHeader />
          <UserSessionProvider user={user}>{children}</UserSessionProvider>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
