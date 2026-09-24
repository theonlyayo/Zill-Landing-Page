import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WaitlistDashboard } from "./WaitlistDashboard";

export const metadata = {
  title: "Waitlist — Zill Team",
  description: "Internal waitlist dashboard",
};

const PAGE_SIZE = 20;

export default async function WaitlistPage() {
  const supabase = await createClient();

  // Double-check auth (middleware should catch this, but defense in depth)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user must change their temporary password before accessing the dashboard
  const { data: member } = await supabase
    .from("team_members")
    .select("must_change_password")
    .eq("user_id", user.id)
    .single();

  if (member?.must_change_password) {
    redirect("/change-password");
  }

  // Fetch initial data — first page, newest first
  const { data: signups, count } = await supabase
    .from("waitlist")
    .select("id, email, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(0, PAGE_SIZE - 1);

  return (
    <WaitlistDashboard
      initialData={signups ?? []}
      totalCount={count ?? 0}
      pageSize={PAGE_SIZE}
    />
  );
}
