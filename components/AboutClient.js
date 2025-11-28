


// components/AboutClient.js
'use client';

export default function AboutClient() {
  return (
    <main className="flex-1 bg-black pt-20">
      
      {/* Hero Manifesto */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-6 animate-pulse">
            Est. 2016 // Akola, India
          </p>
          {/* Added pr-4 and py-2 to fix italic text clipping */}
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-tight mb-8 py-2 pr-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Genesis</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide uppercase max-w-2xl mx-auto leading-relaxed">
            We didn't start in a boardroom. We started with a obsession for anime culture and a refusal to wear boring clothes.
          </p>
        </div>
        
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Stats Grid - Industrial Style */}
      <section className="border-b border-white/10 bg-zinc-950">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-white/10">
          {[
            { label: 'Years Active', value: '08' },
            { label: 'Drops Released', value: '50+' },
            { label: 'Community', value: '10K' },
            { label: 'Craftsmanship', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="p-8 md:p-12 text-center group hover:bg-zinc-900 transition-colors duration-300">
              <div className="text-4xl md:text-6xl font-black text-white italic mb-2 group-hover:text-red-600 transition-colors">
                {stat.value}
              </div>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Typographic Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-none mb-6">
                Redefining <br/>
                <span className="text-red-600">Street Culture</span>
              </h2>
              <div className="h-1 w-20 bg-white"></div>
            </div>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg">
              <p>
                GENZVERSE is not just a clothing brand. It is an exploration of identity through the lens of modern pop culture. Based in the heart of Akola, we combine traditional garment manufacturing expertise with raw, unfiltered streetwear aesthetics.
              </p>
              <p>
                Every piece is cut, sewn, and detailed to bridge the gap between "Merch" and "High Fashion." No cheap prints. No shortcuts. Just heavy fabrics and bold statements.
              </p>
            </div>
            
            <div className="pt-8">
               <div className="inline-block border border-white/20 p-6 bg-zinc-900/50">
                 <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Our Mission</p>
                 <p className="text-xl font-black italic text-white">"To clothe the dreamers."</p>
               </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative aspect-square md:aspect-[4/5] bg-zinc-900 border border-white/10 p-2 group">
            <div className="w-full h-full bg-zinc-950 relative overflow-hidden flex items-center justify-center">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               {/* Center Symbol */}
               <div className="relative z-10 border-4 border-white p-8 group-hover:border-red-600 transition-colors duration-500">
                  <h3 className="text-7xl font-black text-white italic tracking-tighter">GV</h3>
               </div>
               
               <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-500">
                 AKOLA // MH // IN
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-12">Connect With Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20">
            <a href="mailto:hello@genzverse.com" className="group flex flex-col items-center">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</span>
              <span className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">hello@genzverse.com</span>
            </a>
            
            <div className="group flex flex-col items-center">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">HQ</span>
              <span className="text-lg font-bold text-white">Akola, Maharashtra</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}