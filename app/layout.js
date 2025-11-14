// // app/layout.js
// import './globals.css'
// import { CartProvider } from '../components/CartContext'

// export const metadata = {
//   title: {
//     default: 'GenZverse - Premium Fashion',
//     template: '%s | GenZverse'
//   },
//   description: 'Discover premium quality fashion with exceptional designs',
//   keywords: ['fashion', 'clothing', 'premium', 'ecommerce'],
//   authors: [{ name: 'GenZverse' }],
//   openGraph: {
//     title: 'GenZverse - Premium Fashion',
//     description: 'Discover premium quality fashion with exceptional designs',
//     type: 'website',
//   },
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50">
//         <CartProvider>
//           {children}
//         </CartProvider>
//       </body>
//     </html>
//   )
// }

// app/layout.js
import './globals.css'
import { CartProvider } from '../components/CartContext'

export const metadata = {
  title: {
    default: 'GenZverse - Premium Fashion',
    template: '%s | GenZverse'
  },
  description: 'Discover premium quality fashion with exceptional designs',
  keywords: ['fashion', 'clothing', 'premium', 'ecommerce'],
  authors: [{ name: 'GenZverse' }],
  metadataBase: new URL('https://genzverse-ecommerce.vercel.app'), // Add this line
  openGraph: {
    title: 'GenZverse - Premium Fashion',
    description: 'Discover premium quality fashion with exceptional designs',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}