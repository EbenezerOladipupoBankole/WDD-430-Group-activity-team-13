"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import styles from "./page.module.css";

const emptyForm = {
  name: "",
  description: "",
  price: "",
};

export function SellerDashboard() {
  const { role, sellerItems, addSellerItem } = useAuth();
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (role !== "seller") {
      return;
    }

    addSellerItem(form);
    setForm(emptyForm);
  };

  if (role !== "seller") {
    return (
      <section className={styles.gate}>
        <div className={styles.panel}>
          <h1>Seller access required</h1>
          <p>
            This page is for sellers only. Go to login and choose the seller role
            to add products.
          </p>
          <Link className={styles.linkButton} href="/login">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Seller workspace</p>
        <h1>Add items to the site</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            required
            placeholder="Item name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <textarea
            required
            placeholder="Item description"
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
          />
          <input
            required
            placeholder="Price"
            value={form.price}
            onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
          />
          <button className={styles.submit} type="submit">
            Add item
          </button>
        </form>
      </div>

      <div className={styles.panel}>
        <p className={styles.eyebrow}>Your items</p>
        <div className={styles.items}>
          {sellerItems.length === 0 ? (
            <p className={styles.empty}>No items added yet.</p>
          ) : (
            sellerItems.map((item) => (
              <article key={item.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h2>{item.name}</h2>
                  <span>{item.price}</span>
                </div>
                <p>{item.description}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
