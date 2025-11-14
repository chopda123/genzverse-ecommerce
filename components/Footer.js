

// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-4">GenZverse</h3>
            <p className="text-gray-300">
              Premium fashion for the modern individual. Quality meets style in every stitch.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#products" className="hover:text-gold transition-colors">All Products</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">New Arrivals</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">Best Sellers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>support@genzverse.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GenZverse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}