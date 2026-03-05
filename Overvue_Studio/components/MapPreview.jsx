'use client';

import { COLORS, FONTS, REGIONS } from '@/lib/constants';

// Schematic SVG map of Africa — designed to be swapped for Mapbox later.
// To integrate Mapbox, replace this component's return with a <Map> from
// react-map-gl, passing slide.center, slide.zoom, and slide.layers.

const AFRICA_PATH =
  'M 140 20 L 170 15 L 200 18 L 230 30 L 245 55 L 250 80 L 248 100 ' +
  'L 240 120 L 250 140 L 255 165 L 248 190 L 235 210 L 220 230 ' +
  'L 200 245 L 185 250 L 170 245 L 155 235 L 145 220 L 135 200 ' +
  'L 128 175 L 120 150 L 115 125 L 118 100 L 112 80 L 105 60 ' +
  'L 115 40 L 130 25 Z';

const CITY_DOTS = [
  { x: 135, y: 55, label: 'Algiers' },
  { x: 155, y: 80, label: 'Lagos' },
  { x: 200, y: 95, label: 'Addis Ababa' },
  { x: 230, y: 110, label: 'Mogadishu' },
  { x: 175, y: 120, label: 'Kinshasa' },
  { x: 195, y: 165, label: 'Nairobi' },
  { x: 165, y: 210, label: 'Johannesburg' },
  { x: 145, y: 95, label: 'Accra' },
  { x: 210, y: 60, label: 'Cairo' },
  { x: 125, y: 70, label: 'Dakar' },
];

const RIVERS = [
  'M 145 75 Q 160 90, 170 110 Q 175 125, 165 140',
  'M 200 50 L 210 65 Q 215 80, 200 95',
];

const ROADS = [
  'M 135 55 L 155 80 L 175 120',
  'M 210 60 L 200 95 L 195 165',
  'M 145 95 L 155 80',
];

export default function MapPreview({ slide, className = '' }) {
  if (!slide) return null;

  const region = REGIONS.find((r) => r.id === slide.region) || REGIONS[0];
  const activeLayers = slide.layers || [];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: COLORS.bgSecondary,
        border: `1px solid ${COLORS.accentBorder}`,
        borderRadius: 2,
      }}
    >
      {/* Corner brackets */}
      <CornerBrackets />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            ${COLORS.scanline} 0px,
            ${COLORS.scanline} 1px,
            transparent 1px,
            transparent 3px
          )`,
        }}
      />

      {/* SVG Map */}
      <svg
        viewBox="0 0 360 280"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 8px rgba(200, 168, 75, 0.15))' }}
      >
        {/* Grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`vg-${i}`}
            x1={i * 30}
            y1={0}
            x2={i * 30}
            y2={280}
            stroke={COLORS.accentBorder}
            strokeWidth={0.3}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`hg-${i}`}
            x1={0}
            y1={i * 28}
            x2={360}
            y2={i * 28}
            stroke={COLORS.accentBorder}
            strokeWidth={0.3}
          />
        ))}

        {/* Continent outline */}
        <path
          d={AFRICA_PATH}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={0.6}
        />
        <path d={AFRICA_PATH} fill={COLORS.accentBorder} opacity={0.15} />

        {/* Rivers layer */}
        {activeLayers.includes('rivers') &&
          RIVERS.map((d, i) => (
            <path
              key={`river-${i}`}
              d={d}
              fill="none"
              stroke="#4A90D9"
              strokeWidth={1}
              opacity={0.5}
              strokeDasharray="4,3"
            />
          ))}

        {/* Roads layer */}
        {activeLayers.includes('roads') &&
          ROADS.map((d, i) => (
            <path
              key={`road-${i}`}
              d={d}
              fill="none"
              stroke={COLORS.textMuted}
              strokeWidth={0.8}
              opacity={0.4}
              strokeDasharray="2,2"
            />
          ))}

        {/* City dots */}
        {activeLayers.includes('cities') &&
          CITY_DOTS.map((city) => (
            <g key={city.label}>
              <circle cx={city.x} cy={city.y} r={3} fill={COLORS.accent} opacity={0.8} />
              <circle cx={city.x} cy={city.y} r={6} fill={COLORS.accent} opacity={0.15} />
            </g>
          ))}

        {/* Labels layer */}
        {activeLayers.includes('labels') &&
          activeLayers.includes('cities') &&
          CITY_DOTS.map((city) => (
            <text
              key={`label-${city.label}`}
              x={city.x + 8}
              y={city.y + 3}
              fill={COLORS.textSecondary}
              fontSize={7}
              fontFamily={FONTS.mono}
            >
              {city.label}
            </text>
          ))}

        {/* Markers from slide */}
        {(slide.markers || []).map((marker, i) => (
          <g key={`marker-${i}`}>
            <circle cx={marker.x} cy={marker.y} r={5} fill="#E74C3C" opacity={0.9} />
            <circle cx={marker.x} cy={marker.y} r={10} fill="#E74C3C" opacity={0.2} />
          </g>
        ))}

        {/* Region label */}
        <text
          x={10}
          y={270}
          fill={COLORS.textMuted}
          fontSize={8}
          fontFamily={FONTS.mono}
        >
          {region.label.toUpperCase()} · Z{slide.zoom || region.zoom}
        </text>
      </svg>

      {/* Coordinate readout */}
      <div
        className="absolute bottom-2 right-2 z-20"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: COLORS.textMuted,
          letterSpacing: '0.05em',
        }}
      >
        {slide.center?.[1]?.toFixed(1)}°N {slide.center?.[0]?.toFixed(1)}°E
      </div>
    </div>
  );
}

function CornerBrackets() {
  const style = {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: COLORS.accent,
    opacity: 0.4,
    zIndex: 20,
  };

  return (
    <>
      <div style={{ ...style, top: 4, left: 4, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <div style={{ ...style, top: 4, right: 4, borderTop: '1px solid', borderRight: '1px solid' }} />
      <div style={{ ...style, bottom: 4, left: 4, borderBottom: '1px solid', borderLeft: '1px solid' }} />
      <div style={{ ...style, bottom: 4, right: 4, borderBottom: '1px solid', borderRight: '1px solid' }} />
    </>
  );
}
