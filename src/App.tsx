import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import type { Product } from './types';
import './App.css';

// Initial catalog products matching db.json as baseline catalog preview
const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Mechanical Keyboard', price: 120 },
  { id: 'p2', name: 'Wireless Ergonomic Mouse', price: 55 },
  { id: 'p3', name: 'USB-C Multiport Adapter', price: 35 },
  { id: 'p4', name: 'Ultra-Wide Monitor Light Bar', price: 75 },
];

function App() {
  return (
    <div className="app-layout">
      <Header count={0} />
      <main className="main-content">
        <Catalog products={INITIAL_PRODUCTS} />
        <CartDrawer items={[]} />
      </main>
    </div>
  );
}

export default App;
