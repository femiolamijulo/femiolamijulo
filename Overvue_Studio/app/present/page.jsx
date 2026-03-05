'use client';

import { useEffect, useCallback, useRef } from 'react';
import { COLORS, FONTS } from '@/lib/constants';
import useStore from '@/lib/store';
import MapPreview from '@/components/MapPreview';

export default function PresentPage() {
  const slides = useStore((s) => s.slides);
  const activeSlideIndex = useStore((s) => s.activeSlideIndex);
  const nextSlide = useStore((s) => s.nextSlide);
  const prevSlide = useStore((s) => s.prevSlide);
  const isPaused = useStore((s) => s.isPaused);
  const togglePause = useStore((s) => s.togglePause);

  const activeSlide = slides[activeSlideIndex];
  const timerRef = useRef(null);

  // Request fullscreen on mount
  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || !activeSlide) return;
    timerRef.current = setTimeout(() => {
      if (activeSlideIndex < slides.length - 1) {
        nextSlide();
      }
    }, (activeSlide.duration || 8) * 1000);
    return () => clearTimeout(timerRef.current);
  }, [activeSlideIndex, isPaused, activeSlide, slides.length, nextSlide]);

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'p':
          togglePause();
          break;
        case 'Escape':
          window.location.href = '/editor';
          break;
      }
    },
    [nextSlide, prevSlide, togglePause]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!activeSlide) return null;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: COLORS.bgPrimary }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
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

      {/* Corner brackets — full screen */}
      <CornerBrackets />

      {/* Map — full bleed background */}
      <div className="absolute inset-0 z-0">
        <MapPreview slide={activeSlide} className="w-full h-full" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-12">
        {/* Gradient fade from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${COLORS.bgPrimary} 0%, ${COLORS.bgPrimary}CC 30%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl">
          {/* Region tag */}
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              color: COLORS.accent,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {activeSlide.region?.toUpperCase() || 'AFRICA'} ·{' '}
            {String(activeSlideIndex + 1).padStart(2, '0')}/
            {String(slides.length).padStart(2, '0')}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: FONTS.headline,
              fontSize: 56,
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              marginBottom: 12,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {activeSlide.title || 'Untitled'}
          </h1>

          {/* Subtitle */}
          {activeSlide.subtitle && (
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                color: COLORS.accent,
                letterSpacing: '0.05em',
                marginBottom: 16,
              }}
            >
              {activeSlide.subtitle}
            </div>
          )}

          {/* Body */}
          {activeSlide.body && (
            <p
              style={{
                fontFamily: FONTS.mono,
                fontSize: 15,
                color: COLORS.textSecondary,
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              {activeSlide.body}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1">
        <div
          style={{
            height: '100%',
            width: `${((activeSlideIndex + 1) / slides.length) * 100}%`,
            background: COLORS.accent,
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div
          className="absolute top-6 right-6 z-20"
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.accent,
            background: COLORS.bgSecondary,
            border: `1px solid ${COLORS.accentBorder}`,
            padding: '4px 10px',
            borderRadius: 2,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          ‖ Paused
        </div>
      )}

      {/* Controls hint */}
      <div
        className="absolute bottom-4 right-6 z-20"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 8,
          color: COLORS.textMuted,
          letterSpacing: '0.1em',
        }}
      >
        ← → navigate · P pause · ESC editor
      </div>
    </div>
  );
}

function CornerBrackets() {
  const style = {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: COLORS.accent,
    opacity: 0.3,
    zIndex: 20,
  };

  return (
    <>
      <div style={{ ...style, top: 16, left: 16, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <div style={{ ...style, top: 16, right: 16, borderTop: '1px solid', borderRight: '1px solid' }} />
      <div style={{ ...style, bottom: 16, left: 16, borderBottom: '1px solid', borderLeft: '1px solid' }} />
      <div style={{ ...style, bottom: 16, right: 16, borderBottom: '1px solid', borderRight: '1px solid' }} />
    </>
  );
}
