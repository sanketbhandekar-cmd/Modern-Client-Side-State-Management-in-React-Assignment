import { CheckoutContext } from './CheckoutContext';
import { useCartStore } from './cartStore';
import { CartSynchronizer } from './components/CartSynchronizer';
import { OrderCompletionBridge } from './components/OrderCompletionBridge';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { PaymentPanel } from './components/PaymentPanel';
import './App.css';

function App() {
  const items = useCartStore((s) => s.items);

  return (
    <CheckoutContext.Provider options={{ input: { initialItems: items } }}>
      <CartSynchronizer />
      <OrderCompletionBridge />
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Catalog />
          <div className="checkout-sidebar">
            <CartDrawer />
            <PaymentPanel />
          </div>
        </main>
      </div>
    </CheckoutContext.Provider>
  );
}

export default App;
