/**
 * Pixel Tarun Runner Sprite Matrix & Texture Generator
 * Authentic side-profile pixel art for the UX Minigame canvas runner.
 * 
 * Frame 0: Run Contact (Right leg forward, Left leg back)
 * Frame 1: Run Passing (Legs crossing under center of mass)
 * Frame 2: Run Push-Off (Left leg forward, Right leg back)
 * Frame 3: Run Reset (Legs crossing back through center)
 * Frame 4: Jump Leap (Dynamic airborne pose with knees tucked & jacket flare)
 */

export const SPRITE_WIDTH = 24;
export const SPRITE_HEIGHT = 36;

export const TARUN_SPRITE_PALETTE: Record<string, string> = {
  '.': 'transparent',
  'H': '#16101B', // Dark hair/beard
  'h': '#2A2033', // Hair midtone
  'd': '#3F324D', // Hair highlight pompadour
  'S': '#DC9B6E', // Warm skin tone
  's': '#B9774B', // Skin shadow
  'G': '#0B0B0E', // Sunglasses frame black
  'g': '#364759', // Sunglasses lens reflective
  'w': '#88A2C0', // Lens reflective glint
  'J': '#C72430', // Red sherwani base
  'j': '#921520', // Red sherwani shadow
  'k': '#E03644', // Red sherwani highlight
  'Y': '#F6BC36', // Gold embroidery bright
  'y': '#C79020', // Gold embroidery shadow
  'T': '#141418', // Inner black shirt
  'P': '#1A1A20', // Trousers charcoal
  'p': '#101014', // Trousers dark shadow
  'c': '#2C2C36', // Trousers crease
  'B': '#0A0A0E', // Shoes deep black
  'b': '#24242E', // Shoes sole/shine
};

// 24 columns wide, 36 rows tall per frame
const FRAME_0: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddddddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5: Sunglasses top rim
  "...H..hhSSSSGgwgG.......", // 6: Sunglasses lens with glint
  "...H..hhSSSSGgggG.......", // 7: Sunglasses lens
  "...H..hhSSSSsHHH........", // 8: Cheek & mustache under shades
  "....HHHHHSSHHHHH........", // 9: Jaw & beard chin
  ".....HHHHHHHHHH.........", // 10: Under-chin beard
  "......ssJJJJJJ..........", // 11: Neck (skin shadow)
  "....JJJJkYyYJJJJ........", // 12: Sherwani shoulders & gold
  "...jJJJkkYyYJJJJJ.......", // 13: Red jacket with embroidery
  "..jJJJkkkYyYJJJJJJ......", // 14: Chest & front arm
  "..jJJJ...YyYJJJJJJ......", // 15: Arm swinging back
  "..jYYJ...YyY.JJJJ.......", // 16: Gold cuff on sleeve
  "...sS....YyY..jYYj......", // 17: Back hand / front cuff
  "...SS....jJJJ..sS.......", // 18: Front hand extended
  "........jJJJJj.SS.......", // 19: Jacket hem
  "........jJJJJj..........", // 20: Jacket tails
  ".......PPPPPPPP.........", // 21: Hips
  "......pPPPPPcPPP........", // 22: Stride split
  ".....pPPPP..cPPP........", // 23: Front leg reaching forward
  "....pPPPP....cPPP.......", // 24: Back leg extending back
  "...pPPPP......cPPP......", // 25: Solid 4px thick legs
  "..pPPPP........cPPP.....", // 26: Knee driving forward
  "..pPPP..........cPPP....", // 27
  ".pPPP............bBB....", // 28: Front shin / back foot heel
  ".pPPP............BBB....", // 29
  ".BBBB.............bB....", // 30: Front shoe heel strike
  ".bBBB...................", // 31: Front shoe sole
  "........................", // 32
  "........................", // 33
  "........................", // 34
  "........................", // 35
];

const FRAME_1: string[] = [
  ".......HHHHHH...........", // 0
  ".....HHhhhhhhHH.........", // 1
  "....HhhhddddhhhH........", // 2
  "...HhhhddddddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...H..hhSSSSGgwgG.......", // 6
  "...H..hhSSSSGgggG.......", // 7
  "...H..hhSSSSsHHH........", // 8
  "....HHHHHSSHHHHH........", // 9
  ".....HHHHHHHHHH.........", // 10
  "......ssJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "...jJJJkkYyYJJJJJ.......", // 14
  "...jJJJ..YyY.JJJJ.......", // 15
  "...jYYj..YyY.jYYj.......", // 16: Gold cuffs passing
  "....sS...YyY..sS........", // 17: Hands passing
  "....SS...jJJJ.SS........", // 18
  "........jJJJJj..........", // 19
  ".......jjJJJJjj.........", // 20
  ".......PPPPPPPP.........", // 21: Centered hips
  ".......pPPPPPpP.........", // 22: Legs passing under
  ".......pPPPP.PP.........", // 23
  ".......pPPPP.PPc........", // 24: Planted leg vertical, other bent
  ".......pPPPP.PPc........", // 25
  ".......pPPPP..PPc.......", // 26
  ".......pPPPP..cPP.......", // 27
  ".......pPPPP...PP.......", // 28: Passing foot off ground
  ".......pPPPP...bBB......", // 29
  ".......BBBBB...BBB......", // 30: Planted foot flat
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
  "...HhhhddddddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...H..hhSSSSGgwgG.......", // 6
  "...H..hhSSSSGgggG.......", // 7
  "...H..hhSSSSsHHH........", // 8
  "....HHHHHSSHHHHH........", // 9
  ".....HHHHHHHHHH.........", // 10
  "......ssJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "....JJJkkYyYjJJJJ.......", // 14: Opposite arm pump
  "...JJJJ..YyY.JJJJJ......", // 15
  "..jYYj...YyY..JJJJ......", // 16
  "..sS.....YyY..jYYj......", // 17
  "..SS.....jJJJ..sS.......", // 18
  "........jJJJJj.SS.......", // 19
  "........jJJJJj..........", // 20
  ".......PPPPPPPP.........", // 21
  "......pPPPPPcPPP........", // 22: Opposite stride split
  ".....pPPPP..cPPP........", // 23
  "....pPPPP....cPPP.......", // 24
  "...pPPPP......cPPP......", // 25: Solid thick legs
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
  "...HhhhddddddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...H..hhSSSSGgwgG.......", // 6
  "...H..hhSSSSGgggG.......", // 7
  "...H..hhSSSSsHHH........", // 8
  "....HHHHHSSHHHHH........", // 9
  ".....HHHHHHHHHH.........", // 10
  "......ssJJJJJJ..........", // 11
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "...jJJJkkYyYJJJJJ.......", // 14
  "...jJJJ..YyY.JJJJ.......", // 15
  "...jYYj..YyY.jYYj.......", // 16
  "....sS...YyY..sS........", // 17
  "....SS...jJJJ.SS........", // 18
  "........jJJJJj..........", // 19
  ".......jjJJJJjj.........", // 20
  ".......PPPPPPPP.........", // 21
  ".......pPPPPPpP.........", // 22
  ".......pPPPP.PP.........", // 23
  ".......cPP...pPPP.......", // 24: Opposite leg bent forward
  ".......cPP...pPPP.......", // 25
  "......cPP....pPPP.......", // 26
  "......cPP....pPPP.......", // 27
  "......bBB....pPPP.......", // 28
  "......BBB....pPPP.......", // 29
  ".............BBBBB......", // 30: Grounded foot
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
  "...HhhhddddddhhhH.......", // 3
  "...HhhhhhhhhhhhhH.......", // 4
  "...HhhhhhSSSSGGGG.......", // 5
  "...H..hhSSSSGgwgG.......", // 6
  "...H..hhSSSSGgggG.......", // 7
  "...H..hhSSSSsHHH........", // 8
  "....HHHHHSSHHHHH........", // 9
  ".....HHHHHHHHHH.........", // 10
  "......ssJJJJJJ..........", // 11: Leaning into the jump
  "....JJJJkYyYJJJJ........", // 12
  "...jJJJkkYyYJJJJJ.......", // 13
  "..jJJJkkkYyYJJJJJJ......", // 14: Both arms swept back
  ".jYYJJJ..YyY..JJJJ......", // 15: Gold cuffs on trailing arms
  ".sS......YyY..jYYj......", // 16: Trailing hands
  ".SS.....jYYYY..sS.......", // 17
  ".......jjJJJJj.SS.......", // 18: Sherwani tail flaring behind
  "......jjjJJJJjj.........", // 19
  "......jjjJJPPPP.........", // 20
  ".......pPPPPPPP.........", // 21: Hips tucked high
  "......pPPPP..PPP........", // 22: Knees bent up
  ".....pPPPP....PPP.......", // 23: Legs tucked forward in mid-air
  ".....pPPP......PPP......", // 24
  ".....BBBB.......PPP.....", // 25: Shoes tucked
  ".....bBBB.......BBBB....", // 26: Trailing shoe
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
 * Pre-renders the 5 sprite frames onto offscreen HTMLCanvasElement textures.
 * Called once on component mount for instant 60 FPS drawing.
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

    for (let y = 0; y < SPRITE_HEIGHT; y++) {
      const row = frameMatrix[y];
      if (!row) continue;
      for (let x = 0; x < SPRITE_WIDTH; x++) {
        const char = row[x];
        if (char && char !== '.') {
          const color = TARUN_SPRITE_PALETTE[char];
          if (color && color !== 'transparent') {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }

    return canvas;
  });
}
