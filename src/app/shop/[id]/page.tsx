import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/data/mock-data";
import styles from "./page.module.css";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <SiteShell currentPath="/shop">
      <section className={styles.product}>
        <div className={styles.imageBox}>image</div>

        <div className={styles.details}>
          <h1>{product.name}</h1>
          <p className={styles.seller}>{product.seller}</p>
          <p>{product.description}</p>
          <div className={styles.priceBox}>{product.price}</div>
          <div className={styles.buyRow}>
            <button className={styles.buyButton} type="button">
              buy button
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
