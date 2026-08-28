import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Trophy, Zap, Sparkles } from 'lucide-react';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  passed?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  alpha: number;
}

export const UXGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('ux-game-highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [currentLevel, setCurrentLevel] = useState('Sprint: Wireframing');
  const [lastHurdle, setLastHurdle] = useState('Last Change');

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Player Physics with High Jump Clearance & Buffer
  const playerRef = useRef({
    x: 50,
    y: 115,
    width: 20,
    height: 20,
    vy: 0,
    isGrounded: false,
    jumpForce: -8.2, // High clearance jump
    gravity: 0.38,
    rotation: 0
  });

  const jumpBufferRef = useRef(0); // Input buffer for early jump presses
  const obstaclesRef = useRef<Obstacle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const spawnTimerRef = useRef(0);
  const speedRef = useRef(2.4);
  const animationFrameId = useRef<number | null>(null);
  const groundOffsetRef = useRef(0);

  // Short, punchy UI/UX specific hurdle names
  const obstacleTexts = [
    'Last Change',
    'Iterate',
    'Scope Creep',
    'Pixel Off',
    'Font Shift',
    'V2 Draft',
    '404 Error',
    'Dark Pattern',
    'User Bug',
    'Client Edit',
    'Edge Case',
    'Break Point'
  ];

  const getSprintLevel = (currentScore: number) => {
    if (currentScore < 150) return 'Sprint 1: Wireframing';
    if (currentScore < 350) return 'Sprint 2: Prototyping';
    if (currentScore < 650) return 'Sprint 3: Usability Test';
    return 'Sprint 4: Shipped to Prod! 🚀';
  };

  const spawnJumpParticles = (px: number, py: number, color: string) => {
    for (let i = 0; i < 6; i++) {
      particlesRef.current.push({
        x: px + 10,
        y: py + 18,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.7) * 2,
        life: 1,
        maxLife: 14 + Math.random() * 8,
        color: color,
        size: 2 + Math.random() * 2
      });
    }
  };

  const handleStart = () => {
    setGameState('playing');
    setScore(0);
    setCurrentLevel('Sprint 1: Wireframing');
    obstaclesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    speedRef.current = 2.4;
    spawnTimerRef.current = 0;
    groundOffsetRef.current = 0;
    jumpBufferRef.current = 0;
    playerRef.current.y = 115;
    playerRef.current.vy = 0;
    playerRef.current.isGrounded = false;
    playerRef.current.rotation = 0;
  };

  const triggerJump = () => {
    const player = playerRef.current;
    if (gameStateRef.current !== 'playing') return;

    if (player.isGrounded) {
      player.vy = player.jumpForce;
      player.isGrounded = false;
      jumpBufferRef.current = 0;
      const rootStyle = getComputedStyle(document.documentElement);
      const textPrimary = rootStyle.getPropertyValue('--text-primary').trim() || '#1a1814';
      spawnJumpParticles(player.x, player.y, textPrimary);
    } else {
      // Buffer jump input if pressed slightly before landing (10 frames window)
      jumpBufferRef.current = 10;
    }
  };

  // Keyboard controls with jump buffering
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameStateRef.current === 'idle') {
          handleStart();
        } else if (gameStateRef.current === 'playing') {
          triggerJump();
        } else if (gameStateRef.current === 'gameover') {
          handleStart();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = 480;
    const canvasHeight = 160;
    const groundY = 135;
    const obstacleHeight = 15;

    const gameLoop = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const textPrimary = rootStyle.getPropertyValue('--text-primary').trim() || '#121820';
      const textSecondary = rootStyle.getPropertyValue('--text-secondary').trim() || '#566474';
      const borderCard = rootStyle.getPropertyValue('--border-card').trim() || '#D7E1E8';
      const bgSurface = rootStyle.getPropertyValue('--bg-surface').trim() || '#E1E8ED';
      const bgCard = rootStyle.getPropertyValue('--bg-card').trim() || '#FFFFFF';

      // Clear Canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Dot Grid Parallax Background
      ctx.fillStyle = textSecondary;
      ctx.globalAlpha = 0.08;
      const dotSpacing = 24;
      const gridShift = (groundOffsetRef.current * 0.2) % dotSpacing;
      for (let x = -gridShift; x < canvasWidth; x += dotSpacing) {
        for (let y = 20; y < groundY - 10; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      if (gameStateRef.current === 'playing') {
        groundOffsetRef.current += speedRef.current;
      }

      // Ground Line
      ctx.strokeStyle = borderCard;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvasWidth, groundY);
      ctx.stroke();

      // Scrolling Ground Dashes (Monochrome)
      ctx.strokeStyle = textSecondary;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -groundOffsetRef.current;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 4);
      ctx.lineTo(canvasWidth, groundY + 4);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;

      const player = playerRef.current;

      if (gameStateRef.current === 'playing') {
        // Decrease Jump Buffer timer
        if (jumpBufferRef.current > 0) {
          jumpBufferRef.current--;
        }

        // Apply Physics
        player.vy += player.gravity;
        player.y += player.vy;

        // Ground Landing Collision
        if (player.y >= groundY - player.height) {
          player.y = groundY - player.height;
          player.vy = 0;
          player.isGrounded = true;

          // Consume Jump Buffer if pressed right before landing
          if (jumpBufferRef.current > 0) {
            player.vy = player.jumpForce;
            player.isGrounded = false;
            jumpBufferRef.current = 0;
            spawnJumpParticles(player.x, player.y, textPrimary);
          }
        }

        // Jump Rotation
        if (!player.isGrounded) {
          player.rotation += 0.08;
        } else {
          player.rotation = 0;
        }

        // Score & Sprint Level Updates
        setScore((prev) => {
          const next = prev + 1;
          if (next > highScore) {
            setHighScore(next);
            localStorage.setItem('ux-game-highscore', next.toString());
          }
          const newLevel = getSprintLevel(next);
          if (newLevel !== currentLevel) {
            setCurrentLevel(newLevel);
          }
          return next;
        });

        // Obstacles Handling
        spawnTimerRef.current++;
        const spawnInterval = Math.max(90, 140 - Math.floor(scoreRef.current / 300));
        
        if (spawnTimerRef.current >= spawnInterval) {
          spawnTimerRef.current = 0;
          const text = obstacleTexts[Math.floor(Math.random() * obstacleTexts.length)];
          ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
          const textWidth = ctx.measureText(text).width;

          // Compact hurdle width for clear jumpability
          const obsWidth = Math.min(Math.max(textWidth + 14, 44), 72);

          obstaclesRef.current.push({
            x: canvasWidth,
            y: groundY - obstacleHeight,
            width: obsWidth,
            height: obstacleHeight,
            text: text,
            passed: false
          });
        }

        // Smooth speed scaling starting at 2.4
        speedRef.current = 2.4 + (scoreRef.current / 1200);
      }

      // Draw Particles
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        if (p.life >= p.maxLife) particlesRef.current.splice(pIdx, 1);
      }

      // Render Player Character Block (Monochrome)
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.rotate(player.rotation);
      
      const r = 4;
      const w = player.width;
      const h = player.height;
      ctx.fillStyle = textPrimary;
      ctx.beginPath();
      ctx.moveTo(-w/2 + r, -h/2);
      ctx.lineTo(w/2 - r, -h/2);
      ctx.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
      ctx.lineTo(w/2, h/2 - r);
      ctx.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
      ctx.lineTo(-w/2 + r, h/2);
      ctx.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
      ctx.lineTo(-w/2, -h/2 + r);
      ctx.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
      ctx.closePath();
      ctx.fill();

      // Expressive Eyes (contrasting against textPrimary)
      ctx.fillStyle = bgCard;
      ctx.fillRect(1.5, -3.5, 3, 3);
      ctx.fillRect(7, -3.5, 3, 3);
      ctx.restore();

      // Render & Update Obstacles
      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];
        if (gameStateRef.current === 'playing') {
          obs.x -= speedRef.current;
          
          if (!obs.passed && obs.x + obs.width < player.x) {
            obs.passed = true;
            floatingTextsRef.current.push({
              id: Date.now() + Math.random(),
              x: player.x + 10,
              y: player.y - 10,
              text: '+10',
              alpha: 1.0
            });
          }
        }

        // Fair & forgiving hitbox insets (Coyote-friendly collision)
        const hitBoxShrinkX = 6;
        const hitBoxShrinkY = 4;

        if (
          player.x + hitBoxShrinkX < obs.x + obs.width - hitBoxShrinkX &&
          player.x + player.width - hitBoxShrinkX > obs.x + hitBoxShrinkX &&
          player.y + hitBoxShrinkY < obs.y + obs.height &&
          player.y + player.height > obs.y + hitBoxShrinkY
        ) {
          spawnJumpParticles(player.x, player.y, textSecondary);
          setLastHurdle(obs.text);
          setGameState('gameover');
        }

        // Chip Card Hurdle (Monochrome)
        ctx.fillStyle = bgSurface;
        ctx.strokeStyle = borderCard;
        ctx.lineWidth = 1.2;
        const rx = 4;
        ctx.beginPath();
        ctx.moveTo(obs.x + rx, obs.y);
        ctx.lineTo(obs.x + obs.width - rx, obs.y);
        ctx.quadraticCurveTo(obs.x + obs.width, obs.y, obs.x + obs.width, obs.y + rx);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height - rx);
        ctx.quadraticCurveTo(obs.x + obs.width, obs.y + obs.height, obs.x + obs.width - rx, obs.y + obs.height);
        ctx.lineTo(obs.x + rx, obs.y + obs.height);
        ctx.quadraticCurveTo(obs.x, obs.y + obs.height, obs.x, obs.y + obs.height - rx);
        ctx.lineTo(obs.x, obs.y + rx);
        ctx.quadraticCurveTo(obs.x, obs.y, obs.x + rx, obs.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Left indicator tag (Monochrome)
        ctx.fillStyle = textPrimary;
        ctx.fillRect(obs.x + 2, obs.y + 2, 2.5, obs.height - 4);

        // High-contrast readable hurdle text
        ctx.fillStyle = textPrimary;
        ctx.font = '600 10px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obs.text, obs.x + obs.width / 2 + 1, obs.y + obs.height / 2 + 0.5);

        if (obs.x + obs.width < 0) obstaclesRef.current.splice(i, 1);
      }

      // Floating Score Popups (Monochrome)
      for (let ftIdx = floatingTextsRef.current.length - 1; ftIdx >= 0; ftIdx--) {
        const ft = floatingTextsRef.current[ftIdx];
        ft.y -= 0.6;
        ft.alpha -= 0.035;
        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(ftIdx, 1);
          continue;
        }
        ctx.fillStyle = textPrimary;
        ctx.globalAlpha = ft.alpha;
        ctx.font = 'bold 9px monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.globalAlpha = 1.0;
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [highScore, currentLevel]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-4 w-full h-full select-none"
      onTouchStart={() => {
        if (gameState === 'playing') {
          triggerJump();
        }
      }}
    >
      <div className="flex flex-wrap justify-between items-center w-full border-b border-[var(--border-card)] pb-3 gap-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
          >
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold">MINIGAME</span>
              <span 
                className="text-[9px] font-mono px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}
              >
                {currentLevel}
              </span>
            </div>
            <h3 className="text-base font-semibold font-sans text-[var(--text-primary)]">UX Runner</h3>
          </div>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--text-muted)]">SCORE:</span> 
            <span className="font-bold text-[var(--text-primary)]">{score}</span>
          </div>
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}
          >
            <Trophy className="w-3 h-3 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-muted)]">BEST:</span> 
            <span className="font-bold text-[var(--text-primary)]">{highScore}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative flex-1 rounded-2xl border overflow-hidden min-h-[160px] flex items-center justify-center"
        style={{ borderColor: 'var(--border-card)', background: 'var(--bg-base)' }}
      >
        <canvas 
          ref={canvasRef}
          width={480}
          height={160}
          className="w-full h-[160px] max-w-[480px] cursor-default"
        />

        {gameState === 'idle' && (
          <div 
            className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 p-4 text-center z-20 animate-fade-in"
            style={{ background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)' }}
          >
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border shadow-xs"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-primary)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Short UI/UX Hurdles Challenge</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-mono max-w-xs">
              Dodge <span className="text-[var(--text-primary)] font-semibold">"Last Change"</span>, <span className="text-[var(--text-primary)] font-semibold">"Iterate"</span> & <span className="text-[var(--text-primary)] font-semibold">"Scope Creep"</span>
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              <span className="hidden sm:inline">Press Space to Jump</span>
              <span className="sm:hidden">Tap Screen to Jump</span>
            </p>
            <button
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 text-xs font-mono font-bold px-6 py-2.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-sm mt-1 hover:opacity-90"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START SPRINT</span>
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div 
            className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center gap-2 p-4 text-center z-20 animate-fade-in"
            style={{ background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)' }}
          >
            <span 
              className="text-[10px] font-mono font-semibold uppercase tracking-widest px-3 py-0.5 rounded-full border shadow-xs"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-secondary)' }}
            >
              REVISION REQUESTED
            </span>
            <h4 className="text-lg font-bold text-[var(--text-primary)] font-sans mt-0.5 tracking-tight">
              Caught by "{lastHurdle}"!
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Sprint Score: <span className="font-bold text-[var(--text-primary)]">{score}</span> | Best: <span className="font-bold text-[var(--text-primary)]">{highScore}</span>
            </p>
            <button
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 text-xs font-mono font-bold px-6 py-2.5 rounded-full cursor-pointer transition-all active:scale-95 mt-1.5 shadow-sm hover:opacity-90"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ITERATE AGAIN</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UXGame;
