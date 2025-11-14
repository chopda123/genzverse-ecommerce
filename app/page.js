
// app/page.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../data/products';
import CartDrawer from '../components/CartDrawer';
import Link from 'next/link';

export const metadata = {
  title: 'Home - GenZverse',
  description: 'Discover premium quality fashion that combines exceptional design with unparalleled comfort',
};

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Elevate Your Style
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover premium quality fashion that combines exceptional design with unparalleled comfort
            </p>
            <Link href="#products" className="btn-secondary text-lg px-8 py-4 inline-block">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main id="products" className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated selection of premium essentials designed for modern living
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}