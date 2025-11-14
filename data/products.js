// data/products.ts
export const products = [
  {
    slug: 'premium-tshirt',
    name: 'Premium Cotton T-Shirt',
    price: 800,
    description: 'Crafted from 100% premium cotton, this t-shirt offers exceptional comfort and durability. Perfect for everyday wear with its classic fit and modern design.',
    images: ['/products/premium-tshirt/1.jpg.avif', '/products/premium-tshirt/1.2.jpg.avif', '/products/premium-tshirt/1.3.jpg.avif', '/products/premium-tshirt/1.4.jpg.avif'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Limited drop',
    inStock: true,
  },
  {
    slug: 'classic-hoodie',
    name: 'Classic French Terry Hoodie',
    price: 600,
    description: 'Experience ultimate comfort with our French Terry hoodie. Features a premium cotton blend, ribbed cuffs, and a spacious front pocket.',
    images: ['/products/premium-tshirt/2.1.png', '/products/premium-tshirt/2.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Best Seller',
    inStock: true,
  },
  // Add more products following the same structure:
  // {
  //   slug: 'product-slug',
  //   name: 'Product Name',
  //   price: 2999, // in cents/paisa
  //   description: 'Product description',
  //   images: ['/products/slug/1.jpg', '/products/slug/2.jpg', ...],
  //   sizes: ['S','M','L','XL'],
  //   badge: 'Optional badge text',
  //   inStock: true,
  // },
]

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

export function getAllProducts() {
  return products;
}