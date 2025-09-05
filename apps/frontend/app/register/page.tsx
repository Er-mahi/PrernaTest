import { redirect } from "next/navigation";

export default function RegisterRedirect() {
  // Immediately redirect /register to /sign-up
  redirect("/sign-up");
}
