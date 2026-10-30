import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  products?: Product[];
  onAdd?: (product: Product) => void;
  loading?: boolean;
}

export function Catalog({ products = [], onAdd, loading = false }: CatalogProps) {
  return (
    <section className="catalog-section">
      <h2 className="section-title">Products Catalog</h2>
      {loading ? (
        <div className="catalog-loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="catalog-empty">No products available.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}

