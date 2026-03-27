"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "./auth-provider";
import styles from "./site-shell.module.css";

type SiteShellProps = {
  children: ReactNode;
  currentPath:
    | "/"
    | "/shop"
    | "/contact-us"
    | "/cart"
    | "/login"
    | "/seller-dashboard";
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact-us", label: "contact us" },
] as const;

export function SiteShell({ children, currentPath }: SiteShellProps) {
  const { role, logout } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <Link className={styles.logo} href="/">
            Handcrafted Haven
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={currentPath === link.href}
              >
                {link.label}
              </Link>
            ))}
            {role === "seller" ? (
              <Link
                href="/seller-dashboard"
                data-active={currentPath === "/seller-dashboard"}
              >
                seller
              </Link>
            ) : null}
          </nav>

          <div className={styles.actions}>
            <Link className={styles.authButton} href="/login">
              {role === "guest" ? "login" : role}
            </Link>
            <Link className={styles.cartButton} href="/cart">
              cart
            </Link>
            {role !== "guest" ? (
              <button className={styles.logoutButton} type="button" onClick={logout}>
                logout
              </button>
            ) : null}
          </div>
        </header>

        <main className={styles.content}>{children}</main>

        <footer className={styles.footer}>
          <p className={styles.footerNote}>Footer info</p>
          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">facebook</a>
            <a href="#">other</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
