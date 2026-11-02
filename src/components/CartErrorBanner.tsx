import { CheckoutContext } from '../CheckoutContext';

/**
 * Subscribes specifically to the machine's error state to display alert messages.
 * Only re-renders when context.errorMessage changes.
 */
export function CartErrorBanner() {
  const errorMessage = CheckoutContext.useSelector((s) => s.context.errorMessage);

  if (!errorMessage) return null;

  return (
    <div className="cart-error-banner" role="alert">
      <span>{errorMessage}</span>
    </div>
  );
}

