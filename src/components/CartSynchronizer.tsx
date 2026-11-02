import { useEffect } from 'react';
import { useCartStore } from '../cartStore';
import { CheckoutContext } from '../CheckoutContext';

/**
 * Headless bridge component: synchronizes cart updates from the
 * Zustand store into the running XState checkout actor.
 */
export function CartSynchronizer() {
  const items = useCartStore((s) => s.items);
  const actorRef = CheckoutContext.useActorRef();

  useEffect(() => {
    actorRef.send({ type: 'SYNC_ITEMS', items });
  }, [items, actorRef]);

  return null;
}

