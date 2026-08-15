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
      const accentColor = rootStyle.getPropertyValue('--accent').trim() || '#3b82f6';
      spawnJumpParticles(player.x, player.y, accentColor);
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
      const accentColor = rootStyle.getPropertyValue('--accent').trim() || '#3b82f6';
      const textPrimary = rootStyle.getPropertyValue('--text-primary').trim() || '#fafafa';
      const textSecondary = rootStyle.getPropertyValue('--text-secondary').trim() || '#8c8c99';
      const borderCard = rootStyle.getPropertyValue('--border-card').trim() || '#222226';

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
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvasWidth, groundY);
      ctx.stroke();

      // Scrolling Ground Dashes
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.35;
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
            spawnJumpParticles(player.x, player.y, accentColor);
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

      // Render Player Character Block
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.rotate(player.rotation);
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = player.isGrounded ? 4 : 10;
      
      const r = 4;
      const w = player.width;
      const h = player.height;
      ctx.fillStyle = accentColor;
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
      ctx.shadowBlur = 0;
      ctx.strokeStyle = textPrimary;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Expressive Eyes
      ctx.fillStyle = '#ffffff';
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
          spawnJumpParticles(player.x, player.y, '#ef4444');
          setLastHurdle(obs.text);
          setGameState('gameover');
        }

        // Chip Card Hurdle
        ctx.fillStyle = '#121217';
        ctx.strokeStyle = accentColor;
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

        // Left accent tag
        ctx.fillStyle = accentColor;
        ctx.fillRect(obs.x + 2, obs.y + 2, 2.5, obs.height - 4);

        // High-contrast readable hurdle text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obs.text, obs.x + obs.width / 2 + 1, obs.y + obs.height / 2 + 0.5);

        if (obs.x + obs.width < 0) obstaclesRef.current.splice(i, 1);
      }

      // Floating Score Popups
      for (let ftIdx = floatingTextsRef.current.length - 1; ftIdx >= 0; ftIdx--) {
        const ft = floatingTextsRef.current[ftIdx];
        ft.y -= 0.6;
        ft.alpha -= 0.035;
        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(ftIdx, 1);
          continue;
        }
        ctx.fillStyle = accentColor;
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
      onClick={gameState === 'playing' ? triggerJump : undefined}
    >
      <div className="flex flex-wrap justify-between items-center w-full border-b border-border-card/45 pb-3 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">MINIGAME</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent font-semibold">
                {currentLevel}
              </span>
            </div>
            <h3 className="text-base font-semibold font-sans text-text-primary">UX Runner</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-text-secondary/60">SCORE:</span> 
            <span className="font-bold text-text-primary">{score}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1 rounded-full border border-accent/15">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span className="text-text-secondary/60">BEST:</span> 
            <span className="font-bold text-accent">{highScore}</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-bg-base/30 rounded-2xl border border-border-card/50 overflow-hidden min-h-[160px] flex items-center justify-center shadow-inner">
        <canvas 
          ref={canvasRef}
          width={480}
          height={160}
          className="w-full h-[160px] max-w-[480px] cursor-pointer"
        />

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-bg-surface/90 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="flex items-center gap-1.5 text-accent text-xs font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Short UI/UX Hurdles Challenge</span>
            </div>
            <p className="text-xs text-text-secondary font-mono">
              Dodge <span className="text-accent font-bold">"Last Change"</span>, <span className="text-accent font-bold">"Iterate"</span> & <span className="text-accent font-bold">"Scope Creep"</span>
            </p>
            <p className="text-xs font-semibold text-text-primary">Press Space or Tap Screen to Jump</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-xs font-mono font-bold px-5 py-2.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-lg shadow-accent/25 mt-1"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START SPRINT</span>
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-bg-surface/90 backdrop-blur-[3px] flex flex-col items-center justify-center gap-2 p-4 text-center animate-fade-in">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
              REVISION REQUESTED
            </span>
            <h4 className="text-lg font-bold text-text-primary font-sans mt-0.5">Caught by "{lastHurdle}"!</h4>
            <p className="text-xs text-text-secondary font-mono">
              Sprint Score: <span className="font-bold text-text-primary">{score}</span> | Best: <span className="font-bold text-accent">{highScore}</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 bg-text-primary hover:bg-text-primary/90 text-bg-base text-xs font-mono font-bold px-5 py-2.5 rounded-full cursor-pointer transition-all active:scale-95 mt-2 shadow-md"
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
