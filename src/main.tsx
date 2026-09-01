import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Dynamic Circular Favicon generator
const generateCircularFavicon = () => {
  const img = new Image();
  img.src = '/avatar.webp?v=11';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create circular clip
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.clip();
      
      // Render full avatar cleanly within circle
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 64, 64);
      
      // Set favicon
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.type = 'image/png';
      link.href = canvas.toDataURL('image/png');
    }
  };
};

generateCircularFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

