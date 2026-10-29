import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  let signedIn = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    signedIn = Boolean(user);
  } catch {
    signedIn = false;
  }

  redirect(signedIn ? "/home" : "/login");
}
