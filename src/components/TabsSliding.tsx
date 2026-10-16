import React, { useRef, useEffect, useCallback } from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsSlidingProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
  pillClassName?: string;
}

/**
 * Tabs Sliding Transition from transitions.dev
 *
 * A segmented control / tab bar where the active pill slides between options.
 * JavaScript writes the active tab's offsetLeft & offsetWidth; CSS handles the tween.
 * Flattens on prefers-reduced-motion.
 */
export const TabsSliding: React.FC<TabsSlidingProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  tabClassName = '',
  pillClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const movePill = useCallback((tabEl: HTMLButtonElement | undefined, animate: boolean) => {
    const pill = pillRef.current;
    if (!pill || !tabEl) return;

    if (!animate) {
      const prevTransition = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translateX(${tabEl.offsetLeft}px)`;
      pill.style.width = `${tabEl.offsetWidth}px`;
      void pill.offsetWidth; // Force synchronous reflow to snap instantly
      pill.style.transition = prevTransition;
    } else {
      pill.style.transform = `translateX(${tabEl.offsetLeft}px)`;
      pill.style.width = `${tabEl.offsetWidth}px`;
    }
  }, []);

  // Update on active tab change
  useEffect(() => {
    const currentTabEl = tabRefs.current.get(activeTab);
    movePill(currentTabEl, true);
  }, [activeTab, movePill]);

  // Initial mount & resize listener
  useEffect(() => {
    const currentTabEl = tabRefs.current.get(activeTab) || tabRefs.current.get(tabs[0]?.id);
    const frame = requestAnimationFrame(() => {
      movePill(currentTabEl, false);
    });

    const handleResize = () => {
      const el = tabRefs.current.get(activeTab);
      movePill(el, false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab, tabs, movePill]);

  return (
    <div
      ref={containerRef}
      className={`t-tabs ${className}`}
      role="tablist"
    >
      <span
        ref={pillRef}
        className={`t-tabs-pill ${pillClassName}`}
        aria-hidden="true"
      />
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={tab.disabled}
            onClick={() => {
              if (!tab.disabled && activeTab !== tab.id) {
                onChange(tab.id);
              }
            }}
            className={`t-tab ${tabClassName} ${isSelected ? 'is-active' : ''}`}
          >
            {tab.icon && <span className="mr-1.5 inline-flex items-center">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span className="ml-1.5">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TabsSliding;
