import { setup, assign, fromPromise, emit } from 'xstate';
import type { CartItem, CheckoutResult } from './types';

export const checkoutMachine = setup({
  types: {
    context: {} as {
      items: CartItem[];
      errorMessage: string | null;
      orderResult: CheckoutResult | null;
    },
    events: {} as
      | { type: 'SUBMIT' }
      | { type: 'CANCEL' }
      | { type: 'SYNC_ITEMS'; items: CartItem[] },
    input: {} as {
      initialItems: CartItem[];
    },
    output: {} as CheckoutResult,
    emitted: {} as { type: 'orderSuccess'; orderId: string },
  },
  guards: {
    // Pure predicate guard: blocks transition if cart is empty
    hasItems: ({ context }) => context.items.length > 0,
  },
  actors: {
    // Async promise actor with native AbortSignal for cancellation
    chargePaymentGateway: fromPromise(
      async ({
        input,
        signal,
      }: {
        input: { items: CartItem[] };
        signal: AbortSignal;
      }): Promise<CheckoutResult> => {
        const total = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: input.items,
            total,
            createdAt: new Date().toISOString(),
          }),
          // Native AbortSignal: cancels in-flight fetch when submitting state exits
          signal,
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({
            message: 'Payment authorization declined',
          }));
          throw new Error(err.message || 'Payment failed');
        }

        const data = await response.json();
        return {
          orderId: String(data.id || `order-${Date.now()}`),
        };
      },
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'review',
  context: ({ input }) => ({
    items: input.initialItems,
    errorMessage: null,
    orderResult: null,
  }),
  states: {
    review: {
      on: {
        SUBMIT: {
          target: 'submitting',
          guard: 'hasItems',
        },
        SYNC_ITEMS: {
          actions: assign({
            items: ({ event }) => event.items,
          }),
        },
      },
    },
    submitting: {
      invoke: {
        id: 'paymentProcessor',
        src: 'chargePaymentGateway',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: assign({
            orderResult: ({ event }) => event.output,
            errorMessage: null,
          }),
        },
        onError: {
          target: 'review',
          actions: assign({
            errorMessage: ({ event }) => (event.error as Error).message,
          }),
        },
      },
      on: {
        // Customer can cancel mid-flight; exiting the state immediately aborts AbortSignal
        CANCEL: { target: 'review' },
        SYNC_ITEMS: {
          actions: assign({
            items: ({ event }) => event.items,
          }),
        },
      },
    },
    success: {
      type: 'final',
      output: ({ context }) => context.orderResult!,
      entry: emit(({ context }) => ({
        type: 'orderSuccess',
        orderId: context.orderResult?.orderId || '',
      })),
    },
  },
});

