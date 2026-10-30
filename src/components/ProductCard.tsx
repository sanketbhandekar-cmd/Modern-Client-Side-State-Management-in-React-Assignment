import React from 'react';
import type { Product } from '../types';
import { useSetAtom } from 'jotai';
import { addItemAtom } from '../cartAtoms';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard uses useSetAtom(addItemAtom) so it does not subscribe
 * to cart state. It will never re-render when items in the cart change.
 */
export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const addItem = useSetAtom(addItemAtom);

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
