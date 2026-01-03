'use client';

import { useMemo, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LiturgiaDia } from '@/types/liturgia';
import { cn } from '@/lib/utils';
import DayCard from './DayCard';
import DayModal from './DayModal';
import { format, getMonth, getYear, addMonths, subMonths, startOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

interface CalendarGridProps {
  currentDate: Date;
  onDaySelect: (day: LiturgiaDia | null) => void;
  selectedDay: LiturgiaDia | null;
  onMonthChange: (direction: 'next' | 'prev') => void;
}

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function CalendarGrid({ currentDate, onDaySelect, selectedDay, onMonthChange }: CalendarGridProps) {

  const firestore = useFirestore();
  const [isNavigating, setIsNavigating] = useState(false);

  const month = getMonth(currentDate) + 1; // date-fns is 0-indexed, Firestore is 1-indexed
  const year = getYear(currentDate);
  const monthName = format(currentDate, 'MMMM', { locale: es });


  const liturgiasQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'liturgias'),
        where('mes', '==', month),
        where('ano', '==', year)
    );
  }, [firestore, month, year]);

  const { data: days, loading, error } = useCollection(liturgiasQuery);
  
  useEffect(() => {
    if (loading && days) { // Only show loader if we are navigating away from existing data
      setIsNavigating(true);
    } else {
      setIsNavigating(false);
    }
  }, [loading, days]);


  const sortedDays = useMemo(() => {
    if (!days) return [];
    // The query should bring them sorted, but just in case
    return [...(days as LiturgiaDia[])].sort((a, b) => a.dia - b.dia);
  }, [days])


  const firstDayOfMonth = useMemo(() => {
    return startOfMonth(currentDate).getDay();
  }, [currentDate]);

  const emptyCells = useMemo(() => Array(firstDayOfMonth).fill(null), [firstDayOfMonth]);

  const handleDayClick = (day: LiturgiaDia) => {
    onDaySelect(day);
  };

  const handleCloseModal = () => {
    onDaySelect(null);
  };
  
  const canGoToPreviousMonth = getYear(currentDate) > 2026 || (getYear(currentDate) === 2026 && getMonth(currentDate) > 0);
  const canGoToNextMonth = getYear(currentDate) < 2026 || (getYear(currentDate) === 2026 && getMonth(currentDate) < 11);


  return (
    <>
      <main className="container mx-auto px-2 md:px-4 py-8 max-w-7xl flex-1">
        <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => onMonthChange('prev')} 
              disabled={!canGoToPreviousMonth}
              className="p-2 text-stone-500 hover:text-stone-800 disabled:text-stone-300 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <h2 className="text-3xl font-bold font-headline capitalize text-stone-800">{monthName}</h2>
            <button 
              onClick={() => onMonthChange('next')}
              disabled={!canGoToNextMonth}
              className="p-2 text-stone-500 hover:text-stone-800 disabled:text-stone-300 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={28} />
            </button>
        </div>
        <div className="hidden md:flex items-center gap-2 mb-2">
            {WEEKDAYS.map(day => (
                <div key={day} className="text-center flex-1 text-sm font-bold text-stone-500 uppercase">{day}</div>
            ))}
        </div>
        
        {(isNavigating || loading && !days) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-1 md:gap-2 auto-rows-fr">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="h-28 md:h-36 bg-stone-200/50 rounded-xl animate-pulse" />
                ))}
            </div>
        )}

        {!isNavigating && !loading && error && <p className="text-red-500">Error: {error.message}</p>}
        
        {!isNavigating && !loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-1 md:gap-2 auto-rows-fr">
              {emptyCells.map((_, index) => (
                <div key={`empty-${index}`} className="hidden md:block" />
              ))}
              {sortedDays.map((day) => (
                <DayCard key={day.id} day={day} onClick={() => handleDayClick(day)} />
              ))}
            </div>
        )}
      </main>

      {selectedDay && <DayModal day={selectedDay} onClose={handleCloseModal} />}
    </>
  );
}
