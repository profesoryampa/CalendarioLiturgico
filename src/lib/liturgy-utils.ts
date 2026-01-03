import type { LiturgicalColorCode } from '@/types/liturgia';

export const liturgicalColorNameMap: Record<LiturgicalColorCode, string> = {
  g: 'Verde',
  w: 'Blanco',
  r: 'Rojo',
  p: 'Morado',
  ro: 'Rosa',
};

export const liturgicalColorHexMap: Record<LiturgicalColorCode, string> = {
    g: 'hsl(var(--lit-green))',
    w: 'hsl(var(--lit-gold))', // Use gold for white solemnities for visibility
    r: 'hsl(var(--lit-red))',
    p: 'hsl(var(--lit-purple))',
    ro: 'hsl(var(--lit-rose))',
};

export const liturgicalColorDotClassMap: Record<LiturgicalColorCode, string> = {
  g: 'bg-lit-green',
  w: 'bg-stone-200 border border-stone-400',
  r: 'bg-lit-red',
  p: 'bg-lit-purple',
  ro: 'bg-lit-rose',
};

export const liturgicalModalHeaderClassMap: Record<LiturgicalColorCode, string> = {
    g: 'bg-lit-green text-primary-foreground',
    w: 'bg-card text-card-foreground',
    r: 'bg-lit-red text-primary-foreground',
    p: 'bg-lit-purple text-primary-foreground',
    ro: 'bg-lit-rose text-primary-foreground',
};
