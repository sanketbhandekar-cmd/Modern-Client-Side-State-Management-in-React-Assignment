import { CartProvider } from './context/CartProvider';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Catalog />
          <CartDrawer />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
