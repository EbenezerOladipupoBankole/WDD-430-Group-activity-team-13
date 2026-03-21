import { SiteShell } from "@/components/site-shell";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <SiteShell currentPath="/login">
      <LoginForm />
    </SiteShell>
  );
}
