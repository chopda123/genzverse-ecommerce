// app/products/[slug]/page.js
import { getProductBySlug, getAllProducts } from '../../../data/products';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CartDrawer from '../../../components/CartDrawer';
import ProductClient from '../../../components/ProductClient';

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }) {
  // Ensure we await the params if needed
  const slug = (await params).slug;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Elevate Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }) {
  // Ensure we await the params
  const slug = (await params).slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ProductClient product={product} />
      <Footer />
      <CartDrawer />
    </div>
  );
}