import React from 'react';
import antigravityIcon from '../assets/antigravity-icon__full-color.webp';

export const AntigravityBadge: React.FC = () => {
  return (
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="antigravity-badge group"
      aria-label="Vibe coded with Antigravity IDE"
    >
      <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 bg-accent/5 border border-accent/15 group-hover:scale-110 transition-all duration-300">
        <img
          src={antigravityIcon}
          alt="Antigravity"
          className="w-3.5 h-3.5 object-contain group-hover:rotate-[12deg] transition-transform duration-300"
        />
      </div>
      <span>
        Vibe coded with <span className="font-extrabold text-accent">Antigravity</span>
      </span>
    </a>
  );
};

export default AntigravityBadge;
