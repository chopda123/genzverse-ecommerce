



// app/page.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../data/products';
import CartDrawer from '../components/CartDrawer';
import HomeClient from '../components/HomeClient';

export const metadata = {
  title: 'Home - GenZverse',
  description: 'Discover premium quality fashion that combines exceptional design with unparalleled comfort',
};

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomeClient products={products} />
      <Footer />
      <CartDrawer />
    </div>
  );
}