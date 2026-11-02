import { useEffect } from 'react';
import { useCartStore } from '../cartStore';
import { CheckoutContext } from '../CheckoutContext';

/**
 * Headless bridge component: listens to the emitted 'orderSuccess' event
 * from the XState machine and automatically clears the active Zustand store.
 */
export function OrderCompletionBridge() {
  const clearCart = useCartStore((s) => s.clear);
  const actorRef = CheckoutContext.useActorRef();

  useEffect(() => {
    const sub = actorRef.on('orderSuccess', (event) => {
      console.log(`Order ${event.orderId} succeeded! Clearing cart...`);
      clearCart();
    });

    return () => sub.unsubscribe();
  }, [actorRef, clearCart]);

  return null;
}

