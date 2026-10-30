import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Catalog />
        <CartDrawer />
      </main>
    </div>
  );
}

export default App;
