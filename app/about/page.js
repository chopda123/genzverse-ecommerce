


// app/about/page.js
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import AboutClient from '../../components/AboutClient';

export const metadata = {
  title: 'ABOUT | GENZVERSE',
  description: 'The origin story of Akola\'s premier anime streetwear brand.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      <AboutClient />
      <Footer />
      <CartDrawer />
    </div>
  );
}