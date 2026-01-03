import { Info } from 'lucide-react';

const LegendItem = ({ colorClass, label }: { colorClass: string, label: string }) => (
  <div className="flex items-center">
    <span className={`w-3 h-3 rounded-full mr-2 shadow-sm ${colorClass}`}></span>
    {label}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-stone-200 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs md:text-sm mb-6 font-medium text-stone-600">
          <LegendItem colorClass="bg-lit-green" label="Ordinario" />
          <LegendItem colorClass="bg-stone-200 border border-stone-400" label="Solemnidad/Fiesta" />
          <LegendItem colorClass="bg-lit-purple" label="Adviento/Cuaresma" />
          <LegendItem colorClass="bg-lit-red" label="Mártires/Pasión" />
          <div className="flex items-center">
            <Info className="text-blue-500 mr-2 size-4" />
            Jornada Especial
          </div>
        </div>
        <p className="text-stone-400 text-xs italic">
          Calendario Perpetuo basado en normas de la Conferencia Episcopal Argentina.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
