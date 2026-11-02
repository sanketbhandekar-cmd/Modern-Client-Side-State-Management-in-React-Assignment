import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products', { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Failed to fetch catalog: ${res.statusText}`);
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error fetching catalog');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <section className="catalog-section">
      <h2 className="section-title">Products Catalog</h2>
      {loading ? (
        <div className="catalog-loading">Loading products from catalog...</div>
      ) : error ? (
        <div className="catalog-error">{error}</div>
      ) : products.length === 0 ? (
        <div className="catalog-empty">No products available in catalog.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
