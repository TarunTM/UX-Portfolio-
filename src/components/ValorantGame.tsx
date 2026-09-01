import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Crosshair, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import ascentMapImg from '../assets/ascent_map.webp';

// High-fidelity discrete walking poses for Real Yoru
import yoruPose0 from '../assets/yoru_pose_0.webp';
import yoruPose1 from '../assets/yoru_pose_1.webp';
import yoruPose2 from '../assets/yoru_pose_2.webp';
import yoruPose3 from '../assets/yoru_pose_3.webp';

// Holographic Cyan Decoy Clone walking poses
import clonePose0 from '../assets/yoru_clone_pose_0.webp';
import clonePose1 from '../assets/yoru_clone_pose_1.webp';
import clonePose2 from '../assets/yoru_clone_pose_2.webp';
import clonePose3 from '../assets/yoru_clone_pose_3.webp';

interface Agent {
  id: number;
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  isClone: boolean;
  alive: boolean;
  dissolveProgress: number; // 0 to 1
  animOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  isRiftShard?: boolean;
  rotation?: number;
  rotSpeed?: number;
}

interface FloatingMessage {
  id: number;
  x: number;
  y: number;
  text: string;
  alpha: number;
  color: string;
}

export const ValorantGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hits, setHits] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preloaded Images
  const mapImgRef = useRef<HTMLImageElement | null>(null);
  const realPosesRef = useRef<HTMLImageElement[]>([]);
  const clonePosesRef = useRef<HTMLImageElement[]>([]);

  // Audio Context synthesizer for 0-asset tactical sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playShotSound = useCallback((isHit: boolean) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (isHit) {
        // High pitched laser rift shatter
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(960, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);
        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else {
        // Dry tactical click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  // Game loop entities refs
  const agentsRef = useRef<Agent[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingMessage[]>([]);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const nextSpawnTimerRef = useRef(0);

  // Preload map & character pose images
  useEffect(() => {
    const imgMap = new Image();
    imgMap.src = ascentMapImg;
    mapImgRef.current = imgMap;

    const realSrcs = [yoruPose0, yoruPose1, yoruPose2, yoruPose3];
    realPosesRef.current = realSrcs.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const cloneSrcs = [clonePose0, clonePose1, clonePose2, clonePose3];
    clonePosesRef.current = cloneSrcs.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spawn agent pair (Mini Yoru leading + Clone trailing from left)
  const spawnAgentPair = useCallback((_canvasWidth: number, canvasHeight: number) => {
    // Position slightly deeper into the perspective of Ascent courtyard
    const groundY = canvasHeight - 48; 
    const speed = 1.9; // Natural walking forward speed

    // Standardized miniature sprite proportions (160x240 aspect ratio 2:3)
    const spriteHeight = 84;
    const spriteWidth = 56;

    // Agent 1: Yoru Real (Leading)
    const yoru1: Agent = {
      id: Date.now() + Math.random(),
      x: -70,
      y: groundY,
      speed: speed,
      width: spriteWidth,
      height: spriteHeight,
      isClone: false,
      alive: true,
      dissolveProgress: 0,
      animOffset: 0,
    };

    // Agent 2: Yoru Real (Trailing)
    const yoru2: Agent = {
      id: Date.now() + Math.random() + 1,
      x: -160,
      y: groundY,
      speed: speed,
      width: spriteWidth,
      height: spriteHeight,
      isClone: false,
      alive: true,
      dissolveProgress: 0,
      animOffset: 2,
    };

    agentsRef.current = [yoru1, yoru2];
  }, []);

  // Spawn particle explosion on hit
  const spawnHitVFX = (x: number, y: number, _isClone: boolean) => {
    const colors = ['#FF4655', '#FF9F1C', '#FB923C', '#00F5D4', '#FFFFFF', '#38BDF8', '#1D4ED8'];

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 3 + Math.random() * 8;
      particlesRef.current.push({
        x: x,
        y: y - 45 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2.5,
        size: 3 + Math.random() * 5.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        maxLife: 42 + Math.random() * 25,
        life: 0,
        isRiftShard: true,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
      });
    }

    // Add floating impact indicator
    floatingTextsRef.current.push({
      id: Date.now() + Math.random(),
      x: x,
      y: y - 85,
      text: 'YORU ELIMINATED!',
      alpha: 1,
      color: '#FF4655',
    });
  };

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 300);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      canvas.width = newWidth;
      canvas.height = 300;
      width = newWidth;
      height = 300;
    };

    window.addEventListener('resize', handleResize);

    // Initial spawn from offscreen left
    spawnAgentPair(width, height);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((now - lastTime) / 16.66, 2);
      lastTime = now;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // ── 1. DRAW CRISP STATIC ASCENT 2D MAP BACKGROUND ─────────
      const mapImg = mapImgRef.current;

      if (mapImg && mapImg.complete) {
        ctx.drawImage(mapImg, 0, 0, width, height);

        // Tactical ambient vignette & ground contrast
        const vignette = ctx.createLinearGradient(0, 0, 0, height);
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0.42)');
        vignette.addColorStop(0.3, 'rgba(0, 0, 0, 0.05)');
        vignette.addColorStop(0.85, 'rgba(0, 0, 0, 0.05)');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      } else {
        const fallbackGrad = ctx.createLinearGradient(0, 0, 0, height);
        fallbackGrad.addColorStop(0, '#1a2639');
        fallbackGrad.addColorStop(1, '#0e1622');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Radianite glowing ambient particles in the air
      if (Math.random() < 0.15) {
        particlesRef.current.push({
          x: width * 0.65 + (Math.random() - 0.5) * 140,
          y: height * 0.35 + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.5 - Math.random() * 0.7,
          size: 1.5 + Math.random() * 2,
          color: '#00F5D4',
          alpha: 0.85,
          maxLife: 60 + Math.random() * 40,
          life: 0,
        });
      }

      // ── 2. UPDATE & DRAW DYNAMIC WALKING AGENTS ────────────────
      let allPassedOrDead = true;

      agentsRef.current.forEach((agent) => {
        if (agent.alive) {
          // Move forward across screen from left to right
          agent.x += agent.speed * dt;

          if (agent.x < width + 80) {
            allPassedOrDead = false;
          }
        } else {
          agent.dissolveProgress += 0.045 * dt;
        }

        if (agent.dissolveProgress < 1 && agent.x > -100 && agent.x < width + 100) {
          ctx.save();

          // Distance-locked stride: every 18px of movement advances to the next distinct leg pose!
          const stridePhase = (agent.x / 18);
          const poseIndex = (Math.floor(stridePhase) + agent.animOffset) % 4;

          // Subtle vertical stride bounce on leg contact (without head scaling)
          const strideBounce = Math.abs(Math.sin(stridePhase * Math.PI)) * 2.2;
          const renderX = agent.x;
          const renderY = agent.y - agent.height + strideBounce;

          // Dynamic ground contact shadow beneath feet on the courtyard path
          const shadowScale = 1 - (strideBounce / 2.2) * 0.2;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
          ctx.beginPath();
          ctx.ellipse(renderX + agent.width * 0.5, agent.y - 3, agent.width * 0.38 * shadowScale, 4.5 * shadowScale, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.translate(renderX + agent.width / 2, renderY + agent.height / 2);

          if (!agent.alive) {
            ctx.globalAlpha = Math.max(0, 1 - agent.dissolveProgress);
            ctx.scale(1 + agent.dissolveProgress * 0.35, 1 + agent.dissolveProgress * 0.35);
          }

          // Select discrete pose image (normalized 160x240 for both real Yoru characters)
          const poses = realPosesRef.current;
          const currentImg = poses[poseIndex];

          if (currentImg && currentImg.complete) {
            ctx.drawImage(
              currentImg,
              -agent.width / 2,
              -agent.height / 2,
              agent.width,
              agent.height
            );
          }

          ctx.restore();
        }
      });

      // Respawn: If characters walked past the right side or both popped, come from left again!
      if (allPassedOrDead && agentsRef.current.length > 0) {
        nextSpawnTimerRef.current += dt;
        if (nextSpawnTimerRef.current > 20) {
          spawnAgentPair(width, height);
          nextSpawnTimerRef.current = 0;
        }
      }

      // ── 3. UPDATE & DRAW PARTICLES ─────────────────────────
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.08 * dt; // Gravity
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.rotation !== undefined && p.rotSpeed !== undefined) {
          p.rotation += p.rotSpeed * dt;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isRiftShard && p.rotation !== undefined) {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // ── 4. UPDATE & DRAW FLOATING TEXTS ────────────────────
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y -= 1.2 * dt;
        ft.alpha -= 0.02 * dt;

        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = ft.color;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(i, 1);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    // IntersectionObserver for 0% idle CPU usage
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [spawnAgentPair]);

  // Handle Shoot Click / Tap
  const handleShoot = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    let hitOccurred = false;

    // Check hit on alive agents (bounding box around animated character)
    agentsRef.current.forEach((agent) => {
      if (!agent.alive) return;

      const hitBoxLeft = agent.x - 10;
      const hitBoxRight = agent.x + agent.width + 10;
      const hitBoxTop = agent.y - agent.height - 10;
      const hitBoxBottom = agent.y + 10;

      if (clickX >= hitBoxLeft && clickX <= hitBoxRight && clickY >= hitBoxTop && clickY <= hitBoxBottom) {
        agent.alive = false;
        hitOccurred = true;
        setHits((prev) => prev + 1);
        spawnHitVFX(agent.x + agent.width / 2, agent.y, agent.isClone);
        setShowBanner(true);
      }
    });

    playShotSound(hitOccurred);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCrosshairPos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] overflow-hidden relative shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* ── TOP HUD HEADER (MATCHING EXACT DESIGN SYSTEM LAYOUT) ───── */}
      <div className="flex flex-wrap justify-between items-center w-full border-b border-[var(--border-card)] px-4 sm:px-6 py-3.5 bg-[var(--bg-card)]/90 backdrop-blur-md gap-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
          >
            <Crosshair className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm sm:text-base font-semibold font-sans text-[var(--text-primary)]">
              Spot the Real Yoru
            </h3>
            <span 
              className="text-[9px] font-mono px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}
            >
              Map: Range
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}
          >
            <span className="text-[var(--text-muted)]">ELIMINATIONS:</span> 
            <span className="font-bold text-[var(--text-primary)]">{hits}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-surface)] hover:border-[var(--text-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--text-primary)]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── CANVAS ARENA (ASCENT MAP + DYNAMIC WALKING YORU) ───────── */}
      <div 
        className="relative w-full h-[300px] cursor-crosshair overflow-hidden select-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <canvas
          ref={canvasRef}
          onClick={handleShoot}
          onTouchStart={handleShoot}
          onMouseMove={handleMouseMove}
          className="w-full h-full block"
        />

        {/* Tactical Crosshair Overlay (Desktop) - Clean White / High Contrast */}
        {!isMobile && isHovering && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-75 ease-out"
            style={{ left: crosshairPos.x, top: crosshairPos.y }}
          >
            <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.6)]">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
            </div>
            {/* Crosshair ticks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-0.5 h-1.5 bg-white shadow-xs" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-0.5 h-1.5 bg-white shadow-xs" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 h-0.5 w-1.5 bg-white shadow-xs" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 h-0.5 w-1.5 bg-white shadow-xs" />
          </div>
        )}

        {/* Instruction Tag */}
        <div className="absolute bottom-3 left-4 pointer-events-none z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--bg-card)]/90 dark:bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-card)] text-[11px] font-mono text-[var(--text-muted)] shadow-sm">
          <Crosshair className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span>{isMobile ? 'Tap to Shoot Agent' : 'Aim & Click to Shoot Agent'}</span>
        </div>

        {/* ── TACTICAL MODAL / POPUP BANNER ──────────────────────── */}
        {showBanner && (
          <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-opacity duration-300">
            <div className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border-card)] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center gap-4 relative overflow-hidden transform transition-all duration-300 animate-scale-up">
              
              {/* Corner tactical markers */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--border-card)] opacity-60" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--border-card)] opacity-60" />
              <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--border-card)] opacity-60" />
              <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--border-card)] opacity-60" />

              {/* Main Title */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] font-heading leading-tight mt-1">
                You Got the Real Yoru
              </h3>

              {/* Subtext */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-body leading-relaxed max-w-sm">
                There is no Fake yoru just like there is no fake metrics in this Case Study.
              </p>

              {/* Action Button */}
              <div className="flex items-center gap-3 mt-3 w-full justify-center">
                <button
                  onClick={() => {
                    setShowBanner(false);
                    const canvas = canvasRef.current;
                    if (canvas) spawnAgentPair(canvas.width, canvas.height);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-base)] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ValorantGame;
