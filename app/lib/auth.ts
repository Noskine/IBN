import { authOptions } from "@/app/lib/authOptions";

import { getServerSession } from "next-auth";

export async function auth() {
  return await getServerSession(authOptions);
}
