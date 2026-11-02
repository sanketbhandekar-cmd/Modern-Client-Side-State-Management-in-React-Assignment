import React from 'react';
import type { Product } from '../types';
import { useCartStore } from '../cartStore';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard strictly selects `s.addItem` from useCartStore.
 * Since actions in Zustand are referentially stable, ProductCard never
 * re-renders when items in the cart change.
 */
export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="btn-add"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </div>
  );
});
