import { CheckoutContext } from '../CheckoutContext';

/**
 * Subscribes to the machine's transition capabilities, enabling/disabling itself declaratively.
 * Re-renders only when `canSubmit` or `isSubmitting` changes.
 */
export function CheckoutButton() {
  const isSubmitting = CheckoutContext.useSelector((s) => s.matches('submitting'));
  const canSubmit = CheckoutContext.useSelector((s) => s.can({ type: 'SUBMIT' }));
  const actorRef = CheckoutContext.useActorRef();

  return (
    <div className="checkout-btn-wrapper">
      <button
        type="button"
        className="btn-checkout"
        disabled={!canSubmit || isSubmitting}
        onClick={() => actorRef.send({ type: 'SUBMIT' })}
      >
        {isSubmitting ? 'Processing Payment...' : 'Pay Now'}
      </button>
      {isSubmitting && (
        <button
          type="button"
          className="btn-cancel"
          onClick={() => actorRef.send({ type: 'CANCEL' })}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

