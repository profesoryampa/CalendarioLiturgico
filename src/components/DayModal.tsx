import type { LiturgiaDia } from '@/types/liturgia';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Megaphone } from 'lucide-react';
import { liturgicalColorNameMap, liturgicalModalHeaderClassMap } from '@/lib/liturgy-utils';
import { Button } from './ui/button';

interface DayModalProps {
  day: LiturgiaDia;
  onClose: () => void;
}

const DayModal = ({ day, onClose }: DayModalProps) => {
  const open = !!day;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden max-h-[90svh] flex flex-col">
        <DialogHeader className={cn(
          "p-6 text-left space-y-1 relative",
          liturgicalModalHeaderClassMap[day.color_code]
        )}>
          <DialogDescription className={cn(
            "text-xs font-bold uppercase tracking-widest flex items-center gap-2",
            day.color_code === 'w' ? 'text-muted-foreground' : 'text-primary-foreground/80'
          )}>
            <span>{day.fecha_str}</span>
            <span className={cn("w-1 h-1 rounded-full", day.color_code === 'w' ? 'bg-muted-foreground' : 'bg-primary-foreground/80')} />
            <span>{day.rango}</span>
          </DialogDescription>
          <DialogTitle className="text-2xl md:text-3xl font-headline font-bold leading-tight">
            {day.titulo}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
            <div className="p-6 bg-stone-50">
              {day.jornada && (
                <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm flex items-start">
                    <Megaphone className="text-blue-500 size-5 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Jornada Especial</h4>
                    <p className="text-stone-800 font-bold text-sm md:text-base">{day.jornada}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="uppercase">{liturgicalColorNameMap[day.color_code]}</Badge>
                <Badge variant="secondary">Salterio: Propio</Badge>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.15em] mb-4 flex items-center">
                  <BookOpen className="mr-2 size-4" />
                  Liturgia de la Palabra
                </h4>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-stone-200 pl-4 py-1">
                    <span className="block text-xs text-stone-400 font-bold uppercase mb-1">Lecturas</span>
                    <p className="text-stone-800 text-sm md:text-base whitespace-pre-line font-serif">
                      {day.lecturas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <DialogFooter className="bg-stone-100 px-6 py-4 border-t border-stone-200 shrink-0">
            <Button 
              onClick={onClose} 
              className="bg-stone-800 text-white hover:bg-stone-700 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
                Cerrar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DayModal;
