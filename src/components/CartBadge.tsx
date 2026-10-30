import { useAtomValue } from 'jotai';
import { cartCountAtom } from '../cartAtoms';

export function CartBadge() {
  const count = useAtomValue(cartCountAtom);

  return (
    <div className="cart-badge" aria-label={`Shopping cart with ${count} items`}>
      <span className="badge-icon">🛍️</span>
      <span className="badge-label">Cart:</span>
      <span className="badge-count">{count}</span>
    </div>
  );
}
