import React from 'react';
import type { Product } from '../types';
import { useCartDispatch } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard only subscribes to CartDispatchContext.
 * Because dispatch is referentially stable across renders, ProductCard
 * will never re-render when items in the cart change.
 */
export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const dispatch = useCartDispatch();

  const handleAdd = () => {
    dispatch({ type: 'added', product });
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="btn-add"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
});
