'use client';

import { useState } from 'react';
import { COLORS, FONTS, REGIONS, ZOOM_LEVELS } from '@/lib/constants';
import useStore from '@/lib/store';
import MapPreview from '@/components/MapPreview';
import SlideCard from '@/components/SlideCard';
import LayerToggle from '@/components/LayerToggle';

export default function EditorPage() {
  const slides = useStore((s) => s.slides);
  const activeSlideIndex = useStore((s) => s.activeSlideIndex);
  const addSlide = useStore((s) => s.addSlide);
  const updateSlide = useStore((s) => s.updateSlide);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const layerPanelOpen = useStore((s) => s.layerPanelOpen);
  const toggleLayerPanel = useStore((s) => s.toggleLayerPanel);

  const activeSlide = slides[activeSlideIndex];

  const update = (field, value) => {
    updateSlide(activeSlideIndex, { [field]: value });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.bgPrimary }}>
      {/* Scanline overlay */}
      <ScanlineOverlay />

      {/* Left sidebar — slide list */}
      {sidebarOpen && (
        <aside
          className="flex flex-col h-full shrink-0"
          style={{
            width: 260,
            background: COLORS.bgSecondary,
            borderRight: `1px solid ${COLORS.accentBorder}`,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: `1px solid ${COLORS.accentBorder}` }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 9,
                  color: COLORS.textMuted,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Groundmap
              </div>
              <div
                style={{
                  fontFamily: FONTS.headline,
                  fontSize: 16,
                  color: COLORS.accent,
                  marginTop: 2,
                }}
              >
                Story Editor
              </div>
            </div>
            <StatusDot />
          </div>

          {/* Slide list */}
          <div className="flex-1 overflow-y-auto">
            {slides.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                isActive={i === activeSlideIndex}
              />
            ))}
          </div>

          {/* Add slide */}
          <button
            onClick={addSlide}
            className="cursor-pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 0',
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: COLORS.accent,
              background: 'transparent',
              border: 'none',
              borderTop: `1px solid ${COLORS.accentBorder}`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            + Add Slide
          </button>
        </aside>
      )}

      {/* Main workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top toolbar */}
        <Toolbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          layerPanelOpen={layerPanelOpen}
          toggleLayerPanel={toggleLayerPanel}
          slideIndex={activeSlideIndex}
          totalSlides={slides.length}
        />

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map + slide editor */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
            {/* Map preview */}
            <div style={{ aspectRatio: '16/9', maxHeight: '55vh' }}>
              <MapPreview slide={activeSlide} className="w-full h-full" />
            </div>

            {/* Slide fields */}
            {activeSlide && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <FieldLabel>Headline</FieldLabel>
                  <input
                    type="text"
                    value={activeSlide.title}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="Enter headline…"
                    style={inputStyle()}
                  />
                </div>

                <div className="col-span-2">
                  <FieldLabel>Subtitle</FieldLabel>
                  <input
                    type="text"
                    value={activeSlide.subtitle}
                    onChange={(e) => update('subtitle', e.target.value)}
                    placeholder="Subtitle or attribution…"
                    style={inputStyle()}
                  />
                </div>

                <div className="col-span-2">
                  <FieldLabel>Body Text</FieldLabel>
                  <textarea
                    value={activeSlide.body}
                    onChange={(e) => update('body', e.target.value)}
                    placeholder="Narrative text for this slide…"
                    rows={4}
                    style={{ ...inputStyle(), resize: 'vertical' }}
                  />
                </div>

                <div>
                  <FieldLabel>Region</FieldLabel>
                  <select
                    value={activeSlide.region}
                    onChange={(e) => {
                      const region = REGIONS.find((r) => r.id === e.target.value);
                      update('region', e.target.value);
                      if (region) {
                        updateSlide(activeSlideIndex, {
                          region: e.target.value,
                          center: region.center,
                          zoom: region.zoom,
                        });
                      }
                    }}
                    style={inputStyle()}
                  >
                    {REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel>Zoom Level</FieldLabel>
                  <select
                    value={
                      ZOOM_LEVELS.find((z) => z.value === activeSlide.zoom)?.id || 'overview'
                    }
                    onChange={(e) => {
                      const zl = ZOOM_LEVELS.find((z) => z.id === e.target.value);
                      if (zl) update('zoom', zl.value);
                    }}
                    style={inputStyle()}
                  >
                    {ZOOM_LEVELS.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.label} (z{z.value})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel>Transition</FieldLabel>
                  <select
                    value={activeSlide.transition}
                    onChange={(e) => update('transition', e.target.value)}
                    style={inputStyle()}
                  >
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="zoom">Zoom</option>
                    <option value="fly">Fly</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Duration (seconds)</FieldLabel>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={activeSlide.duration}
                    onChange={(e) => update('duration', parseInt(e.target.value) || 8)}
                    style={inputStyle()}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right panel — layers */}
          {layerPanelOpen && (
            <aside
              className="shrink-0 p-4 overflow-y-auto"
              style={{
                width: 220,
                borderLeft: `1px solid ${COLORS.accentBorder}`,
              }}
            >
              <LayerToggle slideIndex={activeSlideIndex} />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────── */

function Toolbar({ sidebarOpen, toggleSidebar, layerPanelOpen, toggleLayerPanel, slideIndex, totalSlides }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2 shrink-0"
      style={{
        borderBottom: `1px solid ${COLORS.accentBorder}`,
        background: COLORS.bgSecondary,
      }}
    >
      <div className="flex items-center gap-3">
        <ToolbarButton onClick={toggleSidebar} active={sidebarOpen}>
          ☰
        </ToolbarButton>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textMuted,
            letterSpacing: '0.05em',
          }}
        >
          {String(slideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ToolbarButton onClick={toggleLayerPanel} active={layerPanelOpen}>
          Layers
        </ToolbarButton>
        <a
          href="/present"
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.bgPrimary,
            background: COLORS.accent,
            padding: '5px 12px',
            borderRadius: 2,
            textDecoration: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Present →
        </a>
      </div>
    </div>
  );
}

function ToolbarButton({ onClick, active, children }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer"
      style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        color: active ? COLORS.accent : COLORS.textMuted,
        background: active ? 'rgba(200, 168, 75, 0.08)' : 'transparent',
        border: `1px solid ${active ? COLORS.accentBorder : 'transparent'}`,
        padding: '4px 10px',
        borderRadius: 2,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }) {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: FONTS.mono,
        fontSize: 9,
        color: COLORS.textMuted,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 4,
      }}
    >
      {children}
    </label>
  );
}

function StatusDot() {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#2ECC71',
          boxShadow: '0 0 6px rgba(46, 204, 113, 0.5)',
        }}
      />
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 8,
          color: COLORS.textMuted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Live
      </span>
    </div>
  );
}

function ScanlineOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
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
  );
}

function inputStyle() {
  return {
    width: '100%',
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textPrimary,
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.accentBorder}`,
    borderRadius: 2,
    padding: '8px 10px',
    outline: 'none',
  };
}
