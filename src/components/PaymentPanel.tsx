import { CheckoutContext } from '../CheckoutContext';

/**
 * PaymentPanel: Rendered as a sibling to CartDrawer directly inside App.tsx.
 * Displays payment processing status, error alerts, and action triggers ("Submit Payment", "Cancel").
 */
export function PaymentPanel() {
  const isSubmitting = CheckoutContext.useSelector((s) => s.matches('submitting'));
  const isSuccess = CheckoutContext.useSelector((s) => s.matches('success'));
  const errorMessage = CheckoutContext.useSelector((s) => s.context.errorMessage);
  const orderResult = CheckoutContext.useSelector((s) => s.context.orderResult);
  const canSubmit = CheckoutContext.useSelector((s) => s.can({ type: 'SUBMIT' }));
  const actorRef = CheckoutContext.useActorRef();

  return (
    <section className="payment-panel">
      <h2 className="panel-title">Payment & Checkout</h2>

      {isSuccess && orderResult && (
        <div className="payment-status success">
          <p className="success-icon">✅</p>
          <p className="success-title">Order Placed Successfully!</p>
          <p className="order-id">Order ID: <strong>{orderResult.orderId}</strong></p>
        </div>
      )}

      {errorMessage && (
        <div className="payment-status error">
          <p>{errorMessage}</p>
        </div>
      )}

      {!isSuccess && (
        <div className="payment-actions">
          <p className="payment-description">
            {isSubmitting
              ? 'Authorizing payment with mock payment gateway...'
              : 'Review your items and complete payment.'}
          </p>
          <div className="payment-btn-group">
            <button
              type="button"
              className="btn-checkout"
              disabled={!canSubmit || isSubmitting}
              onClick={() => actorRef.send({ type: 'SUBMIT' })}
            >
              {isSubmitting ? 'Authorizing Payment...' : 'Submit Payment'}
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
        </div>
      )}
    </section>
  );
}

