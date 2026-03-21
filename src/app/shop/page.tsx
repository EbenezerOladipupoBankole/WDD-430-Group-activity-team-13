"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { SiteShell } from "@/components/site-shell";
import { products, sellers } from "@/data/mock-data";
import styles from "./page.module.css";

export default function ShopPage() {
  const { sellerItems } = useAuth();
  const shopItems = [
    ...products,
    ...sellerItems.map((item) => ({
      ...item,
      seller: "Your seller store",
    })),
  ];

  return (
    <SiteShell currentPath="/shop">
      <div className={styles.shop}>
        <div className={styles.topRow}>
          <p className={styles.topText}>Text</p>
          <p className={styles.topText}>Text</p>
          <div />
          <div className={styles.filterBox}>filters</div>
        </div>

        <div className={styles.grid}>
          {sellers.map((seller, rowIndex) => (
            <div key={seller} className={styles.row}>
              <div className={styles.sellerBox}>seller {rowIndex + 1}</div>
              {shopItems.map((product, index) => (
                <Link
                  key={`${seller}-${product.id}`}
                  href={index < products.length ? `/shop/${product.id}` : "/seller-dashboard"}
                  className={styles.item}
                >
                  <div className={styles.itemBox}>item {index + 1}</div>
                  <p className={styles.itemName}>{product.name}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
