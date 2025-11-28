























// app/page.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllProducts } from '../data/products';
import CartDrawer from '../components/CartDrawer';
import HomeClient from '../components/HomeClient';

export const metadata = {
  title: 'GENZVERSE | Premium Anime Apparel',
  description: 'Limited edition premium anime streetwear designed in Akola.',
};

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      <HomeClient products={products} />
      <Footer />
      <CartDrawer />
    </div>
  );
}