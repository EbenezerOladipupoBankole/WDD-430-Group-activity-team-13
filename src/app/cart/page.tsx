import { SiteShell } from "@/components/site-shell";
import { products } from "@/data/mock-data";
import styles from "./page.module.css";

const cartItems = products.slice(0, 2);

export default function CartPage() {
  return (
    <SiteShell currentPath="/cart">
      <div className={styles.cart}>
        <p className={styles.title}>item list</p>

        <div className={styles.list}>
          {cartItems.map((item, index) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.thumb}>item {index + 1}</div>
              <div>{item.name}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.totals}>
            <span>total</span>
            <span>amount</span>
          </div>
          <button className={styles.checkout} type="button">
            checkout
          </button>
        </div>
      </div>
    </SiteShell>
  );
}
