'use client';

import { useState }from 'react';
import Header from '@/components/Header';
import CalendarGrid from '@/components/CalendarGrid';
import Footer from '@/components/Footer';
import type { LiturgiaDia } from '@/types/liturgia';
import { addMonths, subMonths } from 'date-fns';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = useState<LiturgiaDia | null>(null);

  const handleMonthChange = (direction: 'next' | 'prev') => {
    setCurrentDate(currentDate => direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };
  
  const handleDaySelect = (day: LiturgiaDia | null) => {
    setSelectedDay(day);
  };

  const handleSearchSelect = (day: LiturgiaDia) => {
    // Meses en JS son 0-indexados, en nuestros datos son 1-indexados.
    setCurrentDate(new Date(day.ano, day.mes - 1, 1));
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Header
        onSearchSelect={handleSearchSelect}
      />
      <CalendarGrid
        key={currentDate.toISOString()}
        currentDate={currentDate}
        onDaySelect={handleDaySelect}
        selectedDay={selectedDay}
        onMonthChange={handleMonthChange}
      />
      <Footer />
    </div>
  );
}
