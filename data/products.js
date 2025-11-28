// data/products.ts
export const products = [
  {
    slug: 'premium-tshirt',
    name: 'First Form: Thunder Breathing',
    price: 799, 
    description: `They hear the thunder... but they never see you coming.
The Thunderclap Signature Tee captures that split-second spark of First Form power—frozen mid-strike and printed with electric detail.

Made with jet-black, heavy premium cotton, this tee hits different. The colors crackle against the dark base, giving it a true anime battle-scene vibe.

This isn't just a t-shirt — it's your warning shot.
Don't just watch the anime. Wear the voltage.
`,
    images: ['/products/premium-tshirt/zenitsu-1.png', '/products/premium-tshirt/zenitsu-2.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Limited drop',
    inStock: true,
  },
  {
    slug: 'classic-hoodie',
    name: 'DANDADAN: The Split Soul',
    price: 999,
    description: `This hoodie tells the story of the boy who borrowed a demon's power to do the right thing. With a massive, blood-red graphic on the back and a premium, oversized fit, it’s the ultimate tribute to the season’s wildest anime. Heavy fabric. Heavy hitting action. Secure yours before the spirits do.`,
    images: ['/products/premium-tshirt/dan-2.png','/products/premium-tshirt/dan-3.png','/products/premium-tshirt/dan-4.png','/products/premium-tshirt/dan-5.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Best Seller',
    inStock: true,
  },
  {
    slug: 'kartik-diary',
    name: 'I AM THE ONE',
    price: 799,
    description: `"Wake up. It's time."
 

This isn't a theory, it's a truth. The I AM THE ONE // System Reboot tee speaks volumes in silence. A faceless figure, standing against the digital noise. Are you seeing the code, or just the illusion?

Premium 240 GSM cotton. Bold blue. A design that makes you think. It's clean, it's deep, and it's built to last. Step into the program.`,
    images: ['/products/premium-tshirt/man-3.png','/products/premium-tshirt/man-1.png','/products/premium-tshirt/man-2.png' ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Best Seller',
    inStock: true,
  },

 {
    slug: 'ZEN',
    name: 'Zenitsu',
    price: 899,
    description: ` "If you know, you know."

Clean. Iconic. Essential. This hoodie is the minimalist flex every fan needs. Features the undisputed Demon Slayer mark on a fresh white heavyweight canvas. Pairs perfectly with black cargos and late-night missions. Add to cart. Add to Corps.`,
    images: ['/products/premium-tshirt/zen-2.png','/products/premium-tshirt/zen-1.png' ],
    sizes: ['S', 'M', 'L', 'XL'],
    // badge: 'Best Seller',
    inStock: true,
  },
 {
    slug: 'zoro',
    name: 'Carefree and Fearless zoro',
    price: 799,
    description: `If I can't even protect my Captain's dream, then whatever ambition I have is nothing but talk.

This is the entire mood. The Unbound Ambition tee carries the code of the Pirate Hunter. Half raw power, half relentless devotion. The back features a massive quote that isn't just text—it's a lifestyle motto.

Crafted for the serious collector on ultra-premium black cotton. The multi-colored text detail makes this piece look expensive, moody, and instantly iconic. This tee is for those who walk the walk, no excuses. Keep the promise. Secure the grail`,
    images: ['/products/premium-tshirt/zoro1.png','/products/premium-tshirt/zoro2.png','/products/premium-tshirt/zoro3.png' ],
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
