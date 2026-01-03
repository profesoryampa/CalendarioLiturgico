'use client';

import Image from 'next/image';
import { Circle } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images.json';
import type { LiturgiaDia } from '@/types/liturgia';
import Search from './Search';


interface HeaderProps {
  onSearchSelect: (day: LiturgiaDia) => void;
}


const Header = ({ onSearchSelect }: HeaderProps) => {
  const heroImage = placeholderImages.find(img => img.id === 'hero-church');
  
  const currentYear = 2026;

  return (
    <header className="relative bg-stone-900 text-white shadow-xl overflow-hidden h-80 md:h-64">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-30"
            priority
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>

      <div className="absolute top-4 right-4 z-20">
        <Search onSearchSelect={onSearchSelect} />
      </div>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <div className="mb-3 px-3 py-1 border border-amber-500/50 rounded-full bg-stone-900/50 backdrop-blur-sm">
          <span className="text-amber-400 text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Argentina &middot; Conferencia Episcopal</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-md font-headline">Calendario Litúrgico</h1>
        <h2 className="text-4xl md:text-6xl text-amber-500 font-bold transition-all font-headline mb-4">{currentYear}</h2>
        

        <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-8 text-xs md:text-sm text-stone-300 font-light tracking-wide">
          <span><Circle className="inline-block size-2 mr-2 text-amber-500 fill-amber-500" />Dominical: <strong>Ciclo A</strong></span>
          <span><Circle className="inline-block size-2 mr-2 text-amber-500 fill-amber-500" />Ferial: <strong>Año II (Par)</strong></span>
        </div>

      </div>
    </header>
  );
};

export default Header;
