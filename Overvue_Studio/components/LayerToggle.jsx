'use client';

import { COLORS, FONTS, LAYERS } from '@/lib/constants';
import useStore from '@/lib/store';

export default function LayerToggle({ slideIndex }) {
  const slide = useStore((s) => s.slides[slideIndex]);
  const toggleLayer = useStore((s) => s.toggleLayer);

  if (!slide) return null;

  const activeLayers = slide.layers || [];

  return (
    <div
      style={{
        background: COLORS.bgSecondary,
        border: `1px solid ${COLORS.accentBorder}`,
        borderRadius: 2,
        padding: 12,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: COLORS.textMuted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Map Layers
      </div>

      <div className="grid grid-cols-2 gap-1">
        {LAYERS.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(slideIndex, layer.id)}
              className="text-left cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                background: isActive ? 'rgba(200, 168, 75, 0.08)' : 'transparent',
                border: `1px solid ${isActive ? COLORS.accentBorder : 'transparent'}`,
                borderRadius: 2,
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  color: isActive ? COLORS.accent : COLORS.textMuted,
                  width: 16,
                  textAlign: 'center',
                }}
              >
                {layer.icon}
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  color: isActive ? COLORS.textPrimary : COLORS.textMuted,
                }}
              >
                {layer.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
