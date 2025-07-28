

import { auth } from "@/app/lib/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { redirect } from "next/navigation";

export default async function DbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main>
     <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
    </main>
  );
}
