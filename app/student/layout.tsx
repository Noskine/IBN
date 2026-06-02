import { auth } from "@/app/lib/auth";
import HeaderHome from "@/components/home/HeaderHome";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/student/login");
  }

  if (session?.user?.role === "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-svh bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <HeaderHome top={false} />
      {children}
    </main>
  );
}
