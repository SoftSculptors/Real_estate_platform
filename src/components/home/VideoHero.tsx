'use client';

import SearchBar from './SearchBar';

export default function VideoHero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ontdek Uw Droomhuis in Spanje
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Van moderne appartementen aan de kust tot luxe villa's met zeezicht
        </p>
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
