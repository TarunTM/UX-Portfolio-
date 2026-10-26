# Pixel Tarun Minigame Runner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the placeholder 20×20 monochrome square character in `UXGame.tsx` with an authentic, responsive side-profile running pixel art character of Tarun (4-frame run cycle + 1 mid-air leap pose) in full signature colors (crimson red sherwani with gold embroidery, sunglasses, and dark trousers).

**Architecture:** 
1. Create `src/components/game/pixelTarunRunner.ts` defining the 5 pixel matrices (`24×36` grid) and an offscreen canvas texture generator that pre-renders the 5 frames once at startup.
2. Update `src/components/UXGame.tsx` to initialize and cache the 5 textures, animate running frames dynamically linked to ground speed (`speedRef.current`), switch to the mid-air leap pose during jumps, align foot dust particles, and maintain a fair lower-body collision hitbox.

**Tech Stack:** React 19, TypeScript, HTML5 Canvas, Vite, Tailwind CSS.

---

### Task 1: Create the Pixel Tarun Runner Sprite Matrix Module

**Files:**
- Create: `src/components/game/pixelTarunRunner.ts`

**Step 1: Write the module implementation**
Create `src/components/game/pixelTarunRunner.ts` containing the color palette, 5 frame matrices (`frame0` Contact, `frame1` Passing, `frame2` Push-Off, `frame3` Reset, `frame4` Leap), and the `createTarunRunnerFrames()` factory that returns pre-rendered `HTMLCanvasElement[]`.

**Step 2: Typecheck with TypeScript**
Run: `./node_modules/.bin/tsc -b`
Expected: Exits with code 0.

**Step 3: Commit**
```bash
git add src/components/game/pixelTarunRunner.ts
git commit -m "feat(game): create pixel tarun runner sprite matrix and texture generator"
```

---

### Task 2: Integrate Pixel Tarun Sprite into `UXGame.tsx`

**Files:**
- Modify: `src/components/UXGame.tsx`

**Step 1: Import runner generator and setup sprite frame state**
- Import `createTarunRunnerFrames`, `SPRITE_WIDTH`, `SPRITE_HEIGHT` from `./game/pixelTarunRunner`.
- Initialize `cachedFramesRef` with `createTarunRunnerFrames()`.
- Add `runFrameRef` (0 to 3) and `animTimerRef` for ground stride accumulation.
- Update `playerRef` defaults: `width: 24`, `height: 36`, `y: 99` (so feet rest on `groundY = 135`).

**Step 2: Update game loop physics & animation**
- Ground stride accumulation: `animTimerRef.current += speedRef.current; if (animTimerRef.current >= 14) { runFrameRef.current = (runFrameRef.current + 1) % 4; animTimerRef.current = 0; }`
- Jump handling: Lock frame to index `4` (Leap pose) when `!player.isGrounded`. Remove square rotation.
- Particle positioning: Spawn jump dust particles under the character's feet (`y: player.y + 34`).
- Fair hitbox: Center collision on lower body/feet (`y: player.y + 10` to `player.y + player.height - 2`, `x: player.x + 4` to `player.x + player.width - 4`).

**Step 3: Render character sprite onto canvas**
Replace lines 321-347 in `UXGame.tsx` with:
```typescript
const currentFrame = !player.isGrounded ? 4 : (gameStateRef.current === 'playing' ? runFrameRef.current : 0);
const sprite = cachedFramesRef.current[currentFrame];
if (sprite) {
  ctx.drawImage(sprite, Math.round(player.x), Math.round(player.y));
}
```

**Step 4: Typecheck and build verification**
Run: `./node_modules/.bin/tsc -b && ./node_modules/.bin/vite build`
Expected: Exits with code 0.

**Step 5: Visual verification with headless Chrome**
Take screenshot of the minigame on `http://localhost:5173/#minigame-section` and inspect with `read_file`.

**Step 6: Commit**
```bash
git add src/components/UXGame.tsx
git commit -m "feat(game): integrate animated pixel tarun character into ux minigame"
```
