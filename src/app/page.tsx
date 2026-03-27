import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { products, sellers } from "@/data/mock-data";
import styles from "./home.module.css";

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <div className={styles.home}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Exclusively Handcrafted</span>
            <h1 className={styles.heroTitle}>Where Artistry Meets Soul</h1>
            <p className={styles.heroSubtitle}>
              Connecting passionate artisans with conscious consumers through a curated collection of one-of-a-kind treasures.
            </p>
            <div className={styles.heroActions}>
              <Link href="/shop" className={styles.btnPrimary}>Explore Catalog</Link>
              <Link href="/contact-us" className={styles.btnSecondary}>Our Story</Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/images/hero.png" 
              alt="Handcrafted Haven Collection" 
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* Company Description */}
        <section className={styles.about}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.sectionTitle}>Handcrafted Haven</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <p className={styles.aboutText}>
            Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, connecting talented creators with potential customers who appreciate the beauty and quality of handmade products. The application focuses on fostering a sense of community, supporting local artisans, and promoting sustainable consumption.
          </p>
        </section>

        {/* Featured Sellers Section */}
        <section className={styles.sellerSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Artisans</h2>
            <p className={styles.sectionSubtitle}>Discover the hands behind the craft</p>
          </div>
          
          <div className={styles.sellerRow}>
            <button className={styles.arrowBtn} aria-label="Previous">
              <span className={`${styles.arrow} ${styles.arrowLeft}`} />
            </button>
            <div className={styles.sellerCards}>
              {sellers.map((seller, index) => {
                const product = products[index];
                return (
                  <Link
                    key={seller}
                    className={styles.sellerCard}
                    href={`/shop/${product.id}`}
                  >
                    <div className={styles.sellerAvatar}>
                      {seller.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={styles.sellerName}>{seller}</span>
                    <span className={styles.sellerExpertise}>Master Crafter</span>
                  </Link>
                );
              })}
              <Link className={`${styles.sellerCard} ${styles.browseMore}`} href="/shop">
                <span className={styles.browseIcon}>+</span>
                <span>Discover All</span>
              </Link>
            </div>
            <button className={styles.arrowBtn} aria-label="Next">
              <span className={`${styles.arrow} ${styles.arrowRight}`} />
            </button>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
