import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
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

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Physics & Game Loop variables (using refs to avoid re-renders resetting them)
  const playerRef = useRef({
    x: 50,
    y: 110,
    width: 24,
    height: 24,
    vy: 0,
    isGrounded: false,
    jumpForce: -7.5,
    gravity: 0.35,
    rotation: 0
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const spawnTimerRef = useRef(0);
  const speedRef = useRef(3.5);
  const animationFrameId = useRef<number | null>(null);

  const obstacleTexts = [
    'Scope Creep',
    'Bug',
    'Tight Deadline',
    'Client Review',
    'IE11 Support',
    'Font Shift',
    'Merge Conflict',
    'Crash'
  ];

  const handleStart = () => {
    setGameState('playing');
    setScore(0);
    obstaclesRef.current = [];
    speedRef.current = 3.5;
    spawnTimerRef.current = 0;
    playerRef.current.y = 110;
    playerRef.current.vy = 0;
    playerRef.current.isGrounded = false;
    playerRef.current.rotation = 0;
  };

  const handleJump = () => {
    const player = playerRef.current;
    if (player.isGrounded && gameStateRef.current === 'playing') {
      player.vy = player.jumpForce;
      player.isGrounded = false;
    }
  };

  // Setup keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Stop spacebar scrolling
        if (gameStateRef.current === 'idle') {
          handleStart();
        } else if (gameStateRef.current === 'playing') {
          handleJump();
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

    const gameLoop = () => {
      // 1. Fetch Dynamic Theme Colors from CSS variables
      const rootStyle = getComputedStyle(document.documentElement);
      const accentColor = rootStyle.getPropertyValue('--accent').trim() || '#3b82f6';
      const textPrimary = rootStyle.getPropertyValue('--text-primary').trim() || '#fafafa';
      const textSecondary = rootStyle.getPropertyValue('--text-secondary').trim() || '#8c8c99';
      const borderCard = rootStyle.getPropertyValue('--border-card').trim() || '#222226';

      // Clear Canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw Ground Line
      ctx.strokeStyle = borderCard;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvasWidth, groundY);
      ctx.stroke();

      const player = playerRef.current;

      if (gameStateRef.current === 'playing') {
        // Update Physics
        player.vy += player.gravity;
        player.y += player.vy;

        // Ground Collision
        if (player.y >= groundY - player.height) {
          player.y = groundY - player.height;
          player.vy = 0;
          player.isGrounded = true;
        }

        // Rotate slightly when jumping
        if (!player.isGrounded) {
          player.rotation += 0.08;
        } else {
          player.rotation = 0;
        }

        // Update Score
        setScore((prev) => {
          const next = prev + 1;
          if (next > highScore) {
            setHighScore(next);
            localStorage.setItem('ux-game-highscore', next.toString());
          }
          return next;
        });

        // Obstacles Handling
        spawnTimerRef.current++;
        // Spawn interval decreases slightly as score increases (more speed, tighter spawns)
        const spawnInterval = Math.max(70, 120 - Math.floor(scoreRef.current / 300));
        
        if (spawnTimerRef.current >= spawnInterval) {
          spawnTimerRef.current = 0;
          const text = obstacleTexts[Math.floor(Math.random() * obstacleTexts.length)];
          ctx.font = '10px monospace';
          const textWidth = ctx.measureText(text).width;
          
          obstaclesRef.current.push({
            x: canvasWidth,
            y: groundY - 20,
            width: textWidth + 12,
            height: 18,
            text: text
          });
        }

        // Increase Speed slightly
        speedRef.current = 3.5 + (scoreRef.current / 1000);
      }

      // Draw Player
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.rotate(player.rotation);
      
      // Draw a sleek modern rounded-rectangle block representation for the player (Tarun / Accent Block)
      ctx.fillStyle = accentColor;
      // Draw squircle-like path
      const r = 6; // rounded corner radius
      const w = player.width;
      const h = player.height;
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

      // Outer border for style
      ctx.strokeStyle = textPrimary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Little avatar eyes to give it a character feel
      ctx.fillStyle = textPrimary;
      ctx.fillRect(2, -4, 3, 3);
      ctx.fillRect(8, -4, 3, 3);
      ctx.restore();

      // Draw & Update Obstacles
      const currentObstacles = obstaclesRef.current;
      for (let i = currentObstacles.length - 1; i >= 0; i--) {
        const obs = currentObstacles[i];

        if (gameStateRef.current === 'playing') {
          obs.x -= speedRef.current;
        }

        // Collision Check (AABB with slightly smaller collision box for better user experience)
        const hitBoxShrink = 4;
        if (
          player.x + hitBoxShrink < obs.x + obs.width - hitBoxShrink &&
          player.x + player.width - hitBoxShrink > obs.x + hitBoxShrink &&
          player.y + hitBoxShrink < obs.y + obs.height - hitBoxShrink &&
          player.y + player.height - hitBoxShrink > obs.y + hitBoxShrink
        ) {
          setGameState('gameover');
        }

        // Draw Obstacle Pill
        ctx.fillStyle = borderCard;
        ctx.strokeStyle = textSecondary;
        ctx.lineWidth = 1;
        
        // Draw rounded rectangle for text obstacle
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

        // Draw text inside
        ctx.fillStyle = textPrimary;
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obs.text, obs.x + obs.width / 2, obs.y + obs.height / 2 + 1);

        // Remove offscreen obstacles
        if (obs.x + obs.width < 0) {
          currentObstacles.splice(i, 1);
        }
      }

      // Loop request
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [highScore]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-4 w-full h-full select-none"
      onClick={gameState === 'playing' ? handleJump : undefined}
    >
      <div className="flex justify-between items-center w-full border-b border-border-card/45 pb-3">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">ARCADE</span>
          <h3 className="text-lg font-medium font-sans">UX Runner</h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div>
            <span className="text-text-secondary/60">SCORE:</span> <span className="font-bold">{score}</span>
          </div>
          <div>
            <span className="text-text-secondary/60">HI:</span> <span className="font-bold text-accent">{highScore}</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-bg-base/30 rounded-2xl border border-border-card/50 overflow-hidden min-h-[160px] flex items-center justify-center">
        {/* Transparent canvas element */}
        <canvas 
          ref={canvasRef}
          width={480}
          height={160}
          className="w-full h-[160px] max-w-[480px] cursor-pointer"
        />

        {/* Overlays for idle / gameover */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-bg-surface/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4 text-center">
            <p className="text-xs text-text-secondary font-mono uppercase tracking-widest">Dodge Scope Creep & Bugs</p>
            <p className="text-sm font-semibold text-text-primary">Press Space or Tap to Jump</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-xs font-mono font-medium px-4 py-2 rounded-full cursor-pointer transition-all active:scale-95 shadow-md shadow-accent/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START PLAYING</span>
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-bg-surface/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-4 text-center animate-fade-in">
            <p className="text-xs text-rose-500 font-mono font-bold uppercase tracking-widest">CRASHED</p>
            <h4 className="text-lg font-bold text-text-primary font-serif">Scope Exceeded!</h4>
            <p className="text-xs text-text-secondary font-mono">Final Score: {score}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="flex items-center gap-2 bg-text-primary hover:bg-text-primary/95 text-bg-base text-xs font-mono font-medium px-4 py-2 rounded-full cursor-pointer transition-all active:scale-95 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESTART</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UXGame;
