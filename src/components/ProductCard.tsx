import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="btn-add"
        onClick={() => onAdd?.(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

