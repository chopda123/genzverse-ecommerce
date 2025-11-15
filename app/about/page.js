

// app/about/page.js
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import AboutClient from '../../components/AboutClient';

export const metadata = {
  title: 'About Us - GenZverse',
  description: 'Learn about our journey from a small Akola manufacturer to premium fashion brand',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AboutClient />
      <Footer />
      <CartDrawer />
    </div>
  );
}