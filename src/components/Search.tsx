'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { LiturgiaDia } from '@/types/liturgia';
import { Search as SearchIcon, CalendarDays, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchProps {
  onSearchSelect: (day: LiturgiaDia) => void;
}

export default function Search({ onSearchSelect }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const firestore = useFirestore();
  const inputRef = useRef<HTMLInputElement>(null);

  const allLiturgiesQuery = useMemo(() => {
    if (!firestore) return null;
    // La consulta a Firestore para la búsqueda no necesita orderBy, 
    // ya que el filtrado se hace en el cliente.
    return query(
      collection(firestore, 'liturgias'),
      where('ano', '==', 2026)
    );
  }, [firestore]);

  const { data: allDays, loading } = useCollection(allLiturgiesQuery);

  const filteredDays = useMemo(() => {
    if (!allDays || !searchTerm) return [];
    return (allDays as LiturgiaDia[]).filter((day) =>
      day.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDays, searchTerm]);

  const handleSelect = (day: LiturgiaDia) => {
    onSearchSelect(day);
    setSearchTerm('');
    setPopoverOpen(false);
  };

  useEffect(() => {
    if(isPopoverOpen) {
      inputRef.current?.focus();
    }
  }, [isPopoverOpen]);


  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-stone-900/50 backdrop-blur-sm px-4 py-2 text-sm text-stone-300 hover:text-white hover:bg-stone-800/70 border border-stone-700 hover:border-amber-500 transition-all">
          <SearchIcon className="size-4" />
          <span>Buscar...</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center gap-2 p-3 border-b border-stone-200">
          {loading ? <Loader2 className="size-5 text-stone-500 animate-spin" /> : <SearchIcon className="size-5 text-stone-500" />}
          <Input
            ref={inputRef}
            placeholder="Buscar por solemnidad, fiesta..."
            className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {filteredDays.length > 0 ? (
            <ul className="py-2">
              {filteredDays.map((day) => (
                <li key={day.id}>
                  <button
                    onClick={() => handleSelect(day)}
                    className="w-full text-left px-4 py-2.5 text-sm text-stone-800 hover:bg-stone-100 transition-colors"
                  >
                    <p className="font-semibold">{day.titulo}</p>
                    <p className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <CalendarDays className="size-3" />
                      {day.dia} de {new Date(day.ano, day.mes - 1).toLocaleString('es', { month: 'long' })}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && !loading && (
              <p className="text-center text-sm text-stone-500 py-6">
                No se encontraron resultados.
              </p>
            )
          )}
           {loading && searchTerm && (
              <div className="text-center text-sm text-stone-500 py-6">
                <Loader2 className="size-5 mx-auto text-stone-500 animate-spin" />
                <p className='mt-2'>Buscando...</p>
              </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
