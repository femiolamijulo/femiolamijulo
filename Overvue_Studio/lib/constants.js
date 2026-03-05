// Design tokens
export const COLORS = {
  bgPrimary: '#060C18',
  bgSecondary: '#0A1628',
  bgTertiary: '#0D1D35',
  accent: '#C8A84B',
  accentMuted: 'rgba(200, 168, 75, 0.3)',
  accentBorder: 'rgba(200, 168, 75, 0.2)',
  textPrimary: '#E8E2D0',
  textSecondary: 'rgba(232, 226, 208, 0.6)',
  textMuted: 'rgba(232, 226, 208, 0.4)',
  scanline: 'rgba(200, 168, 75, 0.03)',
};

export const FONTS = {
  mono: '"DM Mono", monospace',
  headline: '"Playfair Display", serif',
};

// Map layers available for story overlays
export const LAYERS = [
  { id: 'borders', label: 'Borders', icon: '◇', default: true },
  { id: 'roads', label: 'Roads', icon: '═', default: false },
  { id: 'rivers', label: 'Rivers', icon: '~', default: false },
  { id: 'cities', label: 'Cities', icon: '●', default: true },
  { id: 'labels', label: 'Labels', icon: 'A', default: true },
  { id: 'terrain', label: 'Terrain', icon: '▲', default: false },
  { id: 'satellite', label: 'Satellite', icon: '◉', default: false },
  { id: 'heatmap', label: 'Heatmap', icon: '▓', default: false },
];

// Focus regions for African continent
export const REGIONS = [
  { id: 'continent', label: 'All Africa', center: [20, 0], zoom: 3 },
  { id: 'west', label: 'West Africa', center: [-5, 10], zoom: 5 },
  { id: 'east', label: 'East Africa', center: [35, 0], zoom: 5 },
  { id: 'north', label: 'North Africa', center: [15, 30], zoom: 5 },
  { id: 'south', label: 'Southern Africa', center: [25, -25], zoom: 5 },
  { id: 'central', label: 'Central Africa', center: [20, 0], zoom: 5 },
  { id: 'horn', label: 'Horn of Africa', center: [42, 8], zoom: 6 },
  { id: 'sahel', label: 'Sahel', center: [5, 15], zoom: 5 },
];

// Zoom presets
export const ZOOM_LEVELS = [
  { id: 'overview', label: 'Overview', value: 3 },
  { id: 'regional', label: 'Regional', value: 5 },
  { id: 'country', label: 'Country', value: 7 },
  { id: 'city', label: 'City', value: 10 },
  { id: 'street', label: 'Street', value: 14 },
];

// Create an empty slide template
export function emptySlide() {
  return {
    id: crypto.randomUUID(),
    title: '',
    subtitle: '',
    body: '',
    region: 'continent',
    zoom: 3,
    center: [20, 0],
    layers: LAYERS.filter((l) => l.default).map((l) => l.id),
    markers: [],
    annotations: [],
    transition: 'fade',
    duration: 8,
  };
}
