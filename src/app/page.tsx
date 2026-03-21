import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { products, sellers } from "@/data/mock-data";
import styles from "./home.module.css";

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <div className={styles.home}>
        <p className={styles.heroLabel}>Hero section</p>
        <div className={styles.heroBox}>hero image</div>

        <section className={styles.description}>
          <h1>Company description</h1>
          <p>
            Handcrafted Haven is a marketplace for artisans to present handmade
            products, connect with customers, and support a stronger creative
            community around locally made goods.
          </p>
        </section>

        <section className={styles.sellerSection}>
          <p className={styles.sellerHeader}>Sellers</p>
          <div className={styles.sellerRow}>
            <span className={`${styles.arrow} ${styles.arrowLeft}`} />
            <div className={styles.sellerCards}>
              {sellers.map((seller, index) => {
                const product = products[index];

                return (
                  <Link
                    key={seller}
                    className={styles.sellerCard}
                    href={`/shop/${product.id}`}
                  >
                    {seller}
                  </Link>
                );
              })}
              <Link className={styles.sellerCard} href="/shop">
                browse more
              </Link>
            </div>
            <span className={`${styles.arrow} ${styles.arrowRight}`} />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
