import { SiteShell } from "@/components/site-shell";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <SiteShell currentPath="/contact-us">
      <section className={styles.contact}>
        <div className={styles.stack}>
          <p>email</p>
          <p>phone</p>
          <p>order</p>
          <a href="mailto:support@handcraftedhaven.com">support</a>
        </div>
      </section>
    </SiteShell>
  );
}
