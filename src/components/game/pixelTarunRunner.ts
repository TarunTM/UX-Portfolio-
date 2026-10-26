/**
 * Double-Scale (48x72) Pixel Tarun Runner Sprite Generator
 * Authentic side-profile pixel art for UX Minigame runner.
 * Features:
 * - Handsome, clean side profile matching tarun_front_body.png
 * - Dark sunglasses with white glint
 * - Full trimmed jawline beard & mustache
 * - Crimson sherwani with gold embroidery & silver kada
 * - Pre-rendered at 2x pixel scale (48x72 canvas texture) for crisp retro sharpness
 */

export const SPRITE_WIDTH = 48;
export const SPRITE_HEIGHT = 72;

export const TARUN_SPRITE_PALETTE: Record<string, string> = {
  '.': 'transparent',
  'H': '#120D17',
  'h': '#281F33',
  'd': '#423354',
  'D': '#5E4975',
  'S': '#DE9B72',
  's': '#B8734A',
  'G': '#0B0B0E',
  'g': '#2E3E50',
  'w': '#FFFFFF',
  'J': '#C72430',
  'j': '#80121A',
  'k': '#E53846',
  'Y': '#F6BC36',
  'y': '#C79020',
  'T': '#141418',
  'A': '#E6EBF2',
  'R': '#D82632',
  'P': '#1A1A22',
  'p': '#101015',
  'c': '#2C2C38',
  'B': '#08080C',
  'b': '#22222D',
};

const FRAME_0: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddDDddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...HhhhhhSSGGgwgG.......", // 6
  "...HhhhhhSSGGgggG.......", // 7
  "....HHHHHSSsHHHH........", // 8
  ".....HHHHHHHHHHH........", // 9
  "......HHHHHHHHH.........", // 10
  "......TTJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "..jJJJkkkYyYJJJJJJ......", // 14
  "..jJJJ...YyYJJJJJJ......", // 15
  "..jYYJ...YyY.JJJJ.......", // 16
  "...AR....YyY..jYYj......", // 17
  "...SS....jJJJ..AR.......", // 18
  "........jJJJJj.SS.......", // 19
  "........jJJJJj..........", // 20
  ".......PPPPPPPP.........", // 21
  "......pPPPPPcPPP........", // 22
  ".....pPPPP..cPPP........", // 23
  "....pPPPP....cPPP.......", // 24
  "...pPPPP......cPPP......", // 25
  "..pPPPP........cPPP.....", // 26
  "..pPPP..........cPPP....", // 27
  ".pPPP............bBB....", // 28
  ".pPPP............BBB....", // 29
  ".BBBB.............bB....", // 30
  ".bBBB...................", // 31
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

const FRAME_1: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddDDddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...HhhhhhSSGGgwgG.......", // 6
  "...HhhhhhSSGGgggG.......", // 7
  "....HHHHHSSsHHHH........", // 8
  ".....HHHHHHHHHHH........", // 9
  "......HHHHHHHHH.........", // 10
  "......TTJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "...jJJJkkYyYJJJJJ.......", // 14
  "...jJJJ..YyY.JJJJ.......", // 15
  "...jYYj..YyY.jYYj.......", // 16
  "....AR...YyY..AR........", // 17
  "....SS...jJJJ.SS........", // 18
  "........jJJJJj..........", // 19
  ".......jjJJJJjj.........", // 20
  ".......PPPPPPPP.........", // 21
  ".......pPPPPPpP.........", // 22
  ".......pPPPP.PP.........", // 23
  ".......pPPPP.PPc........", // 24
  ".......pPPPP.PPc........", // 25
  ".......pPPPP..PPc.......", // 26
  ".......pPPPP..cPP.......", // 27
  ".......pPPPP...PP.......", // 28
  ".......pPPPP...bBB......", // 29
  ".......BBBBB...BBB......", // 30
  ".......bBBBB............", // 31
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

const FRAME_2: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddDDddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...HhhhhhSSGGgwgG.......", // 6
  "...HhhhhhSSGGgggG.......", // 7
  "....HHHHHSSsHHHH........", // 8
  ".....HHHHHHHHHHH........", // 9
  "......HHHHHHHHH.........", // 10
  "......TTJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "....JJJkkYyYjJJJJ.......", // 14
  "...JJJJ..YyY.JJJJJ......", // 15
  "..jYYj...YyY..JJJJ......", // 16
  "..AR.....YyY..jYYj......", // 17
  "..SS.....jJJJ..AR.......", // 18
  "........jJJJJj.SS.......", // 19
  "........jJJJJj..........", // 20
  ".......PPPPPPPP.........", // 21
  "......pPPPPPcPPP........", // 22
  ".....pPPPP..cPPP........", // 23
  "....pPPPP....cPPP.......", // 24
  "...pPPPP......cPPP......", // 25
  "..pPPPP........cPPP.....", // 26
  "..pPPP..........cPPP....", // 27
  ".pPPP............bBB....", // 28
  ".pPPP............BBB....", // 29
  ".BBBB.............bB....", // 30
  ".bBBB...................", // 31
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

const FRAME_3: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddDDddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...HhhhhhSSGGgwgG.......", // 6
  "...HhhhhhSSGGgggG.......", // 7
  "....HHHHHSSsHHHH........", // 8
  ".....HHHHHHHHHHH........", // 9
  "......HHHHHHHHH.........", // 10
  "......TTJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "...jJJJkkYyYJJJJJ.......", // 14
  "...jJJJ..YyY.JJJJ.......", // 15
  "...jYYj..YyY.jYYj.......", // 16
  "....AR...YyY..AR........", // 17
  "....SS...jJJJ.SS........", // 18
  "........jJJJJj..........", // 19
  ".......jjJJJJjj.........", // 20
  ".......PPPPPPPP.........", // 21
  ".......pPPPPPpP.........", // 22
  ".......pPPPP.PP.........", // 23
  ".......cPP...pPPP.......", // 24
  ".......cPP...pPPP.......", // 25
  "......cPP....pPPP.......", // 26
  "......cPP....pPPP.......", // 27
  "......bBB....pPPP.......", // 28
  "......BBB....pPPP.......", // 29
  ".............BBBBB......", // 30
  ".............bBBBB......", // 31
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

const FRAME_4: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddDDddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...HhhhhhSSGGgwgG.......", // 6
  "...HhhhhhSSGGgggG.......", // 7
  "....HHHHHSSsHHHH........", // 8
  ".....HHHHHHHHHHH........", // 9
  "......HHHHHHHHH.........", // 10
  "......TTJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "..jJJJkkkYyYJJJJJJ......", // 14
  ".jYYJJJ..YyY..JJJJ......", // 15
  ".AR......YyY..jYYj......", // 16
  ".SS.....jYYYY..AR.......", // 17
  ".......jjJJJJj.SS.......", // 18
  "......jjjJJJJjj.........", // 19
  "......jjjJJPPPP.........", // 20
  ".......pPPPPPPP.........", // 21
  "......pPPPP..PPP........", // 22
  ".....pPPPP....PPP.......", // 23
  ".....pPPP......PPP......", // 24
  ".....BBBB.......PPP.....", // 25
  ".....bBBB.......BBBB....", // 26
  "................bBBB....", // 27
  "........................", // 28
  "........................", // 29
  "........................", // 30
  "........................", // 31
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

export const RAW_SPRITE_FRAMES = [FRAME_0, FRAME_1, FRAME_2, FRAME_3, FRAME_4];

/**
 * Pre-renders the 5 sprite frames at 2x scale (48x72 pixels) onto offscreen canvases.
 * Uses 2x2 pixel chunks for authentic retro pixel density.
 */
export function createTarunRunnerFrames(): HTMLCanvasElement[] {
  if (typeof document === 'undefined') return [];

  return RAW_SPRITE_FRAMES.map((frameMatrix) => {
    const canvas = document.createElement('canvas');
    canvas.width = SPRITE_WIDTH;
    canvas.height = SPRITE_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.imageSmoothingEnabled = false;

    // Render 24x36 matrix at 2x scale -> 48x72 texture
    for (let y = 0; y < 36; y++) {
      const row = frameMatrix[y];
      if (!row) continue;
      for (let x = 0; x < 24; x++) {
        const char = row[x];
        if (char && char !== '.') {
          const color = TARUN_SPRITE_PALETTE[char];
          if (color && color !== 'transparent') {
            ctx.fillStyle = color;
            ctx.fillRect(x * 2, y * 2, 2, 2);
          }
        }
      }
    }

    return canvas;
  });
}
