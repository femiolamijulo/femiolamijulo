import { create } from 'zustand';
import { emptySlide } from './constants';

const useStore = create((set, get) => ({
  // Slides
  slides: [emptySlide()],
  activeSlideIndex: 0,

  // Presentation state
  isPresenting: false,
  isPaused: false,

  // Editor state
  sidebarOpen: true,
  layerPanelOpen: false,

  // Computed
  get activeSlide() {
    const state = get();
    return state.slides[state.activeSlideIndex] || null;
  },

  // Slide actions
  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),

  addSlide: () =>
    set((state) => {
      const newSlide = emptySlide();
      const slides = [...state.slides, newSlide];
      return { slides, activeSlideIndex: slides.length - 1 };
    }),

  removeSlide: (index) =>
    set((state) => {
      if (state.slides.length <= 1) return state;
      const slides = state.slides.filter((_, i) => i !== index);
      const activeSlideIndex = Math.min(state.activeSlideIndex, slides.length - 1);
      return { slides, activeSlideIndex };
    }),

  updateSlide: (index, updates) =>
    set((state) => {
      const slides = state.slides.map((slide, i) =>
        i === index ? { ...slide, ...updates } : slide
      );
      return { slides };
    }),

  reorderSlides: (fromIndex, toIndex) =>
    set((state) => {
      const slides = [...state.slides];
      const [moved] = slides.splice(fromIndex, 1);
      slides.splice(toIndex, 0, moved);
      return { slides, activeSlideIndex: toIndex };
    }),

  duplicateSlide: (index) =>
    set((state) => {
      const original = state.slides[index];
      const duplicate = { ...original, id: crypto.randomUUID(), title: `${original.title} (copy)` };
      const slides = [...state.slides];
      slides.splice(index + 1, 0, duplicate);
      return { slides, activeSlideIndex: index + 1 };
    }),

  // Layer toggles
  toggleLayer: (slideIndex, layerId) =>
    set((state) => {
      const slides = state.slides.map((slide, i) => {
        if (i !== slideIndex) return slide;
        const layers = slide.layers.includes(layerId)
          ? slide.layers.filter((l) => l !== layerId)
          : [...slide.layers, layerId];
        return { ...slide, layers };
      });
      return { slides };
    }),

  // Presentation
  startPresentation: () => set({ isPresenting: true, isPaused: false }),
  stopPresentation: () => set({ isPresenting: false, isPaused: false }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  nextSlide: () =>
    set((state) => ({
      activeSlideIndex: Math.min(state.activeSlideIndex + 1, state.slides.length - 1),
    })),

  prevSlide: () =>
    set((state) => ({
      activeSlideIndex: Math.max(state.activeSlideIndex - 1, 0),
    })),

  // UI
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleLayerPanel: () => set((state) => ({ layerPanelOpen: !state.layerPanelOpen })),
}));

export default useStore;
