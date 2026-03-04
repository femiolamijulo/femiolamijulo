'use client';

import { COLORS, FONTS, REGIONS } from '@/lib/constants';
import useStore from '@/lib/store';

export default function SlideCard({ slide, index, isActive }) {
  const setActiveSlideIndex = useStore((s) => s.setActiveSlideIndex);
  const removeSlide = useStore((s) => s.removeSlide);
  const duplicateSlide = useStore((s) => s.duplicateSlide);
  const slides = useStore((s) => s.slides);

  const region = REGIONS.find((r) => r.id === slide.region) || REGIONS[0];

  return (
    <div
      onClick={() => setActiveSlideIndex(index)}
      className="cursor-pointer group relative"
      style={{
        padding: '12px 14px',
        background: isActive ? COLORS.bgTertiary : 'transparent',
        borderLeft: isActive
          ? `2px solid ${COLORS.accent}`
          : '2px solid transparent',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Slide number */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: isActive ? COLORS.accent : COLORS.textMuted,
          letterSpacing: '0.1em',
          marginBottom: 4,
          textTransform: 'uppercase',
        }}
      >
        Slide {String(index + 1).padStart(2, '0')} · {region.label}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: 14,
          color: isActive ? COLORS.textPrimary : COLORS.textSecondary,
          lineHeight: 1.3,
          marginBottom: 4,
        }}
      >
        {slide.title || 'Untitled'}
      </div>

      {/* Subtitle */}
      {slide.subtitle && (
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textMuted,
            lineHeight: 1.4,
          }}
        >
          {slide.subtitle}
        </div>
      )}

      {/* Duration badge */}
      <div
        className="mt-2 inline-block"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 8,
          color: COLORS.textMuted,
          background: COLORS.bgSecondary,
          padding: '2px 6px',
          borderRadius: 2,
          border: `1px solid ${COLORS.accentBorder}`,
        }}
      >
        {slide.duration}s · {slide.layers?.length || 0} layers
      </div>

      {/* Hover actions */}
      <div
        className="absolute top-2 right-2 hidden group-hover:flex gap-1"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            duplicateSlide(index);
          }}
          style={{
            background: COLORS.bgSecondary,
            border: `1px solid ${COLORS.accentBorder}`,
            color: COLORS.textMuted,
            fontFamily: FONTS.mono,
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          dup
        </button>
        {slides.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeSlide(index);
            }}
            style={{
              background: COLORS.bgSecondary,
              border: '1px solid rgba(231, 76, 60, 0.3)',
              color: '#E74C3C',
              fontFamily: FONTS.mono,
              fontSize: 9,
              padding: '2px 6px',
              borderRadius: 2,
              cursor: 'pointer',
            }}
          >
            del
          </button>
        )}
      </div>
    </div>
  );
}
