


// app/products/[slug]/page.js
import { getAllProducts, getProductBySlug } from '../../../data/products';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductClient from '../../../components/ProductClient';
import CartDrawer from '../../../components/CartDrawer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not Found' };
  
  return {
    title: `${product.name.toUpperCase()} | GENZVERSE`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      <ProductClient product={product} />
      <Footer />
      <CartDrawer />
    </div>
  );
}