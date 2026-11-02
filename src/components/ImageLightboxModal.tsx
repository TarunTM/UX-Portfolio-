import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxMedia {
  src: string;
  type?: 'image' | 'video';
  alt?: string;
  caption?: string;
}

// Backward-compatible alias
export type LightboxImage = LightboxMedia;

interface ImageLightboxModalProps {
  image?: LightboxMedia | null;
  images?: LightboxMedia[] | null;
  initialIndex?: number;
  isOpen?: boolean;
  onIndexChange?: (index: number) => void;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  image,
  images,
  initialIndex = 0,
  isOpen,
  onIndexChange,
  onClose,
}) => {
  const activeItems: LightboxMedia[] =
    images && images.length > 0 ? images : image ? [image] : [];
  const isModalOpen =
    isOpen !== undefined
      ? isOpen && activeItems.length > 0
      : activeItems.length > 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync internal index when initialIndex changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isModalOpen]);

  const hasMultiple = activeItems.length > 1;
  const currentItem = activeItems[currentIndex] || activeItems[0];

  const isVideoItem = (item?: LightboxMedia) => {
    if (!item) return false;
    if (item.type === 'video') return true;
    if (item.type === 'image') return false;
    return /\.(webm|mp4|mov|ogg)(\?.*)?$/i.test(item.src);
  };

  const isCurrentVideo = isVideoItem(currentItem);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasMultiple) return;
    const nextIdx =
      (currentIndex - 1 + activeItems.length) % activeItems.length;
    setCurrentIndex(nextIdx);
    onIndexChange?.(nextIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasMultiple) return;
    const nextIdx = (currentIndex + 1) % activeItems.length;
    setCurrentIndex(nextIdx);
    onIndexChange?.(nextIdx);
  };

  // Lock body scroll and listen for Escape & Arrow keys
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, currentIndex, activeItems.length, hasMultiple, onClose]);

  return (
    <AnimatePresence>
      {isModalOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
        >
          {/* Top Bar: Counter / Caption & Close Button */}
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              {hasMultiple && (
                <span
                  className="text-white/80 text-[13px] sm:text-[14px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 font-semibold tabular-nums"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  {currentIndex + 1} / {activeItems.length}
                </span>
              )}
              {currentItem.caption && (
                <span className="text-white/90 text-[13px] sm:text-[14px] font-medium px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hidden sm:inline-block">
                  {currentItem.caption}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow Button (when multiple items) */}
          {hasMultiple && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous item"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Lightbox Media Container */}
          <motion.div
            key={currentItem.src}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isCurrentVideo ? (
              <video
                src={currentItem.src}
                controls
                autoPlay
                loop
                playsInline
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/15 bg-black"
              />
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.alt || 'Full size preview'}
                className="max-w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/15"
              />
            )}
          </motion.div>

          {/* Right Arrow Button (when multiple items) */}
          {hasMultiple && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next item"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightboxModal;
