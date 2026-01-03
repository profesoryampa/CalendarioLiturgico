export type LiturgicalColorCode = 'g' | 'w' | 'r' | 'p' | 'ro';

export interface LiturgiaDia {
  id: string;
  fecha_str: string;
  dia: number;
  mes: number;
  ano: number;
  dia_semana: string;
  color_code: LiturgicalColorCode;
  titulo: string;
  rango: string;
  jornada?: string | null;
  contenido: string[];
  lecturas: string;
}
