"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import styles from "./page.module.css";

export function LoginForm() {
  const router = useRouter();
  const { login, role } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"user" | "seller">("user");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(selectedRole);
    router.push(selectedRole === "seller" ? "/seller-dashboard" : "/shop");
  };

  return (
    <section className={styles.login}>
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Account access</p>
        <h1>Choose how you want to enter Handcrafted Haven.</h1>
        <p className={styles.copy}>
          Continue as a shopper to browse products, or sign in as a seller to add
          items to the marketplace dashboard.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.option}>
            <input
              checked={selectedRole === "user"}
              name="role"
              type="radio"
              onChange={() => setSelectedRole("user")}
            />
            <span>
              <strong>User</strong>
              <small>Browse items, product pages, and cart flow.</small>
            </span>
          </label>

          <label className={styles.option}>
            <input
              checked={selectedRole === "seller"}
              name="role"
              type="radio"
              onChange={() => setSelectedRole("seller")}
            />
            <span>
              <strong>Seller</strong>
              <small>Open the seller dashboard and add products locally.</small>
            </span>
          </label>

          <button className={styles.submit} type="submit">
            {role === "guest" ? "Continue" : "Switch role"}
          </button>
        </form>
      </div>
    </section>
  );
}
