import type { LiturgiaDia } from '@/types/liturgia';
import { cn } from '@/lib/utils';
import { liturgicalColorDotClassMap, liturgicalColorHexMap } from '@/lib/liturgy-utils';
import { Info } from 'lucide-react';

interface DayCardProps {
  day: LiturgiaDia;
  onClick: () => void;
}

const DayCard = ({ day, onClick }: DayCardProps) => {
  const isSunday = day.dia_semana === 'Domingo';
  const isSolemnity = day.rango.includes('Solemnidad');
  const hasTopBorder = isSunday || isSolemnity;

  return (
    <div
      onClick={onClick}
      className={cn(
        'day-cell relative h-28 md:h-36 p-2 rounded-xl flex flex-col justify-between overflow-hidden cursor-pointer border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-accent',
        hasTopBorder ? 'border-t-4 bg-stone-50' : 'border-stone-200'
      )}
      style={hasTopBorder ? { borderTopColor: liturgicalColorHexMap[day.color_code] } : {}}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn(
            'font-bold text-lg md:text-xl font-headline',
            isSunday ? 'text-red-700' : 'text-stone-700'
          )}
        >
          {day.dia}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {day.jornada && <Info className="size-3.5 text-blue-500" />}
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              liturgicalColorDotClassMap[day.color_code]
            )}
          />
        </div>
      </div>
      <div className="mt-1 flex-grow flex flex-col justify-end">
        <p className={cn(
            "text-xs md:text-sm leading-tight text-stone-600 line-clamp-3",
            isSolemnity && "font-bold text-stone-900"
          )}>
          {day.titulo}
        </p>
      </div>
    </div>
  );
};

export default DayCard;
