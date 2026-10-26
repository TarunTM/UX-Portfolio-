/**
 * Double-Scale (48x72) Pixel Tarun Runner Sprite Generator
 * Authentic side-profile pixel art for UX Minigame runner.
 * Features:
 * - High-Resolution 1:1 Head Profile with detailed sunglasses glint, beard, mustache, and pompadour
 * - Crimson sherwani with gold embroidery & silver kada
 * - 4-frame animated running stride cycle + 1 airborne leap pose
 * - Native 1:1 pixel rendering for razor-sharp fidelity on Retina displays
 */

export const SPRITE_WIDTH = 48;
export const SPRITE_HEIGHT = 72;

export const TARUN_SPRITE_PALETTE: Record<string, string> = {
  '.': 'transparent',
  'H': '#120D17', // Dark black hair & beard
  'h': '#281F33', // Hair deep tone
  'm': '#3B2D4A', // Hair midtone
  'd': '#4E3A63', // Pompadour highlight
  'D': '#664C82', // Pompadour crest glint
  'S': '#DE9B72', // Warm tan skin tone
  's': '#BD764A', // Skin contour / shadow
  't': '#9E5830', // Nostril / lip crease
  'e': '#EEB28A', // Skin highlight
  'w': '#FFFFFF', // Glasses glint / teeth
  'G': '#0B0B0E', // Glasses black frame
  'g': '#2E3E50', // Sunglasses dark lens
  'T': '#141418', // Inner shirt
  'J': '#C72430', // Crimson sherwani
  'j': '#80121A', // Deep crimson
  'k': '#E53846', // Highlight crimson
  'Y': '#F6BC36', // Gold embroidery
  'y': '#C79020', // Antique gold
  'A': '#E6EBF2', // Silver kada
  'R': '#D82632', // Kalava thread
  'P': '#1A1A22', // Black trousers
  'p': '#101015', // Trousers shadow
  'c': '#2C2C38', // Trousers crease
  'B': '#08080C', // Leather shoes
  'b': '#22222D', // Shoe shine
};

const FRAME_0: string[] = [
  "................HHHHHHHH........................", // 0
  "..............HHHhhhhhhHHH......................", // 1
  "............HHhhhhddddhhhhHH....................", // 2
  "...........HhhhddddDDddddhhhH...................", // 3
  "..........HhhhdddDDDDDDdddhhhH..................", // 4
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 5
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 6
  "..........HhhhhhSSSSSSGGGGGGGG..................", // 7
  "..........HhhhhhSSGGGGggggggGG..................", // 8
  "..........HhhhhhSSGGggwwggggGG..................", // 9
  "..........HhhhhhSSGGggwwggggGG..................", // 10
  "..........HhhhhhSSGGggggggggGG..................", // 11
  "...........HHHHHSSGGGGGGGGGGGG..................", // 12
  "...........HHHHHSSSSSSssssGGGS..................", // 13
  "............HHHHSSSSSSSssssss...................", // 14
  "............HHHHHSSSssHHHHHHHH..................", // 15
  ".............HHHHHSSssHHssHH....................", // 16
  "..............HHHHHHHHHHHHHHHH..................", // 17
  "..............HHHHHHHHHHHHHHH...................", // 18
  "...............HHHHHHHHHHHHH....................", // 19
  "................HHHHHHHHHHHH....................", // 20
  "................HHHHHHHHHHHH....................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 24
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 25
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 26
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 27
  "....jjJJJJJJkkkkkkYYyyYYJJJJJJJJJJJJ............", // 28
  "....jjJJJJJJkkkkkkYYyyYYJJJJJJJJJJJJ............", // 29
  "....jjJJJJJJ......YYyyYYJJJJJJJJJJJJ............", // 30
  "....jjJJJJJJ......YYyyYYJJJJJJJJJJJJ............", // 31
  "....jjYYYYJJ......YYyyYY..JJJJJJJJ..............", // 32
  "....jjYYYYJJ......YYyyYY..JJJJJJJJ..............", // 33
  "......AARR........YYyyYY....jjYYYYjj............", // 34
  "......AARR........YYyyYY....jjYYYYjj............", // 35
  "......SSSS........jjJJJJJJ....AARR..............", // 36
  "......SSSS........jjJJJJJJ....AARR..............", // 37
  "................jjJJJJJJJJjj..SSSS..............", // 38
  "................jjJJJJJJJJjj..SSSS..............", // 39
  "................jjJJJJJJJJjj....................", // 40
  "................jjJJJJJJJJjj....................", // 41
  "..............PPPPPPPPPPPPPPPP..................", // 42
  "..............PPPPPPPPPPPPPPPP..................", // 43
  "............ppPPPPPPPPPPccPPPPPP................", // 44
  "............ppPPPPPPPPPPccPPPPPP................", // 45
  "..........ppPPPPPPPP....ccPPPPPP................", // 46
  "..........ppPPPPPPPP....ccPPPPPP................", // 47
  "........ppPPPPPPPP........ccPPPPPP..............", // 48
  "........ppPPPPPPPP........ccPPPPPP..............", // 49
  "......ppPPPPPPPP............ccPPPPPP............", // 50
  "......ppPPPPPPPP............ccPPPPPP............", // 51
  "....ppPPPPPPPP................ccPPPPPP..........", // 52
  "....ppPPPPPPPP................ccPPPPPP..........", // 53
  "....ppPPPPPP....................ccPPPPPP........", // 54
  "....ppPPPPPP....................ccPPPPPP........", // 55
  "..ppPPPPPP........................bbBBBB........", // 56
  "..ppPPPPPP........................bbBBBB........", // 57
  "..ppPPPPPP........................BBBBBB........", // 58
  "..ppPPPPPP........................BBBBBB........", // 59
  "..BBBBBBBB..........................bbBB........", // 60
  "..BBBBBBBB..........................bbBB........", // 61
  "..bbBBBBBB......................................", // 62
  "..bbBBBBBB......................................", // 63
  "................................................", // 64
  "................................................", // 65
  "................................................", // 66
  "................................................", // 67
  "................................................", // 68
  "................................................", // 69
  "................................................", // 70
  "................................................", // 71
];

const FRAME_1: string[] = [
  "................HHHHHHHH........................", // 0
  "..............HHHhhhhhhHHH......................", // 1
  "............HHhhhhddddhhhhHH....................", // 2
  "...........HhhhddddDDddddhhhH...................", // 3
  "..........HhhhdddDDDDDDdddhhhH..................", // 4
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 5
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 6
  "..........HhhhhhSSSSSSGGGGGGGG..................", // 7
  "..........HhhhhhSSGGGGggggggGG..................", // 8
  "..........HhhhhhSSGGggwwggggGG..................", // 9
  "..........HhhhhhSSGGggwwggggGG..................", // 10
  "..........HhhhhhSSGGggggggggGG..................", // 11
  "...........HHHHHSSGGGGGGGGGGGG..................", // 12
  "...........HHHHHSSSSSSssssGGGS..................", // 13
  "............HHHHSSSSSSSssssss...................", // 14
  "............HHHHHSSSssHHHHHHHH..................", // 15
  ".............HHHHHSSssHHssHH....................", // 16
  "..............HHHHHHHHHHHHHHHH..................", // 17
  "..............HHHHHHHHHHHHHHH...................", // 18
  "...............HHHHHHHHHHHHH....................", // 19
  "................HHHHHHHHHHHH....................", // 20
  "................HHHHHHHHHHHH....................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 24
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 25
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 26
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 27
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 28
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 29
  "......jjJJJJJJ....YYyyYY..JJJJJJJJ..............", // 30
  "......jjJJJJJJ....YYyyYY..JJJJJJJJ..............", // 31
  "......jjYYYYjj....YYyyYY..jjYYYYjj..............", // 32
  "......jjYYYYjj....YYyyYY..jjYYYYjj..............", // 33
  "........AARR......YYyyYY....AARR................", // 34
  "........AARR......YYyyYY....AARR................", // 35
  "........SSSS......jjJJJJJJ..SSSS................", // 36
  "........SSSS......jjJJJJJJ..SSSS................", // 37
  "................jjJJJJJJJJjj....................", // 38
  "................jjJJJJJJJJjj....................", // 39
  "..............jjjjJJJJJJJJjjjj..................", // 40
  "..............jjjjJJJJJJJJjjjj..................", // 41
  "..............PPPPPPPPPPPPPPPP..................", // 42
  "..............PPPPPPPPPPPPPPPP..................", // 43
  "..............ppPPPPPPPPPPppPP..................", // 44
  "..............ppPPPPPPPPPPppPP..................", // 45
  "..............ppPPPPPPPP..PPPP..................", // 46
  "..............ppPPPPPPPP..PPPP..................", // 47
  "..............ppPPPPPPPP..PPPPcc................", // 48
  "..............ppPPPPPPPP..PPPPcc................", // 49
  "..............ppPPPPPPPP..PPPPcc................", // 50
  "..............ppPPPPPPPP..PPPPcc................", // 51
  "..............ppPPPPPPPP....PPPPcc..............", // 52
  "..............ppPPPPPPPP....PPPPcc..............", // 53
  "..............ppPPPPPPPP....ccPPPP..............", // 54
  "..............ppPPPPPPPP....ccPPPP..............", // 55
  "..............ppPPPPPPPP......PPPP..............", // 56
  "..............ppPPPPPPPP......PPPP..............", // 57
  "..............ppPPPPPPPP......bbBBBB............", // 58
  "..............ppPPPPPPPP......bbBBBB............", // 59
  "..............BBBBBBBBBB......BBBBBB............", // 60
  "..............BBBBBBBBBB......BBBBBB............", // 61
  "..............bbBBBBBBBB........................", // 62
  "..............bbBBBBBBBB........................", // 63
  "................................................", // 64
  "................................................", // 65
  "................................................", // 66
  "................................................", // 67
  "................................................", // 68
  "................................................", // 69
  "................................................", // 70
  "................................................", // 71
];

const FRAME_2: string[] = [
  "................HHHHHHHH........................", // 0
  "..............HHHhhhhhhHHH......................", // 1
  "............HHhhhhddddhhhhHH....................", // 2
  "...........HhhhddddDDddddhhhH...................", // 3
  "..........HhhhdddDDDDDDdddhhhH..................", // 4
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 5
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 6
  "..........HhhhhhSSSSSSGGGGGGGG..................", // 7
  "..........HhhhhhSSGGGGggggggGG..................", // 8
  "..........HhhhhhSSGGggwwggggGG..................", // 9
  "..........HhhhhhSSGGggwwggggGG..................", // 10
  "..........HhhhhhSSGGggggggggGG..................", // 11
  "...........HHHHHSSGGGGGGGGGGGG..................", // 12
  "...........HHHHHSSSSSSssssGGGS..................", // 13
  "............HHHHSSSSSSSssssss...................", // 14
  "............HHHHHSSSssHHHHHHHH..................", // 15
  ".............HHHHHSSssHHssHH....................", // 16
  "..............HHHHHHHHHHHHHHHH..................", // 17
  "..............HHHHHHHHHHHHHHH...................", // 18
  "...............HHHHHHHHHHHHH....................", // 19
  "................HHHHHHHHHHHH....................", // 20
  "................HHHHHHHHHHHH....................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 24
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 25
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 26
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 27
  "........JJJJJJkkkkYYyyYYjjJJJJJJJJ..............", // 28
  "........JJJJJJkkkkYYyyYYjjJJJJJJJJ..............", // 29
  "......JJJJJJJJ....YYyyYY..JJJJJJJJJJ............", // 30
  "......JJJJJJJJ....YYyyYY..JJJJJJJJJJ............", // 31
  "....jjYYYYjj......YYyyYY....JJJJJJJJ............", // 32
  "....jjYYYYjj......YYyyYY....JJJJJJJJ............", // 33
  "....AARR..........YYyyYY....jjYYYYjj............", // 34
  "....AARR..........YYyyYY....jjYYYYjj............", // 35
  "....SSSS..........jjJJJJJJ....AARR..............", // 36
  "....SSSS..........jjJJJJJJ....AARR..............", // 37
  "................jjJJJJJJJJjj..SSSS..............", // 38
  "................jjJJJJJJJJjj..SSSS..............", // 39
  "................jjJJJJJJJJjj....................", // 40
  "................jjJJJJJJJJjj....................", // 41
  "..............PPPPPPPPPPPPPPPP..................", // 42
  "..............PPPPPPPPPPPPPPPP..................", // 43
  "............ppPPPPPPPPPPccPPPPPP................", // 44
  "............ppPPPPPPPPPPccPPPPPP................", // 45
  "..........ppPPPPPPPP....ccPPPPPP................", // 46
  "..........ppPPPPPPPP....ccPPPPPP................", // 47
  "........ppPPPPPPPP........ccPPPPPP..............", // 48
  "........ppPPPPPPPP........ccPPPPPP..............", // 49
  "......ppPPPPPPPP............ccPPPPPP............", // 50
  "......ppPPPPPPPP............ccPPPPPP............", // 51
  "....ppPPPPPPPP................ccPPPPPP..........", // 52
  "....ppPPPPPPPP................ccPPPPPP..........", // 53
  "....ppPPPPPP....................ccPPPPPP........", // 54
  "....ppPPPPPP....................ccPPPPPP........", // 55
  "..ppPPPPPP........................bbBBBB........", // 56
  "..ppPPPPPP........................bbBBBB........", // 57
  "..ppPPPPPP........................BBBBBB........", // 58
  "..ppPPPPPP........................BBBBBB........", // 59
  "..BBBBBBBB..........................bbBB........", // 60
  "..BBBBBBBB..........................bbBB........", // 61
  "..bbBBBBBB......................................", // 62
  "..bbBBBBBB......................................", // 63
  "................................................", // 64
  "................................................", // 65
  "................................................", // 66
  "................................................", // 67
  "................................................", // 68
  "................................................", // 69
  "................................................", // 70
  "................................................", // 71
];

const FRAME_3: string[] = [
  "................HHHHHHHH........................", // 0
  "..............HHHhhhhhhHHH......................", // 1
  "............HHhhhhddddhhhhHH....................", // 2
  "...........HhhhddddDDddddhhhH...................", // 3
  "..........HhhhdddDDDDDDdddhhhH..................", // 4
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 5
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 6
  "..........HhhhhhSSSSSSGGGGGGGG..................", // 7
  "..........HhhhhhSSGGGGggggggGG..................", // 8
  "..........HhhhhhSSGGggwwggggGG..................", // 9
  "..........HhhhhhSSGGggwwggggGG..................", // 10
  "..........HhhhhhSSGGggggggggGG..................", // 11
  "...........HHHHHSSGGGGGGGGGGGG..................", // 12
  "...........HHHHHSSSSSSssssGGGS..................", // 13
  "............HHHHSSSSSSSssssss...................", // 14
  "............HHHHHSSSssHHHHHHHH..................", // 15
  ".............HHHHHSSssHHssHH....................", // 16
  "..............HHHHHHHHHHHHHHHH..................", // 17
  "..............HHHHHHHHHHHHHHH...................", // 18
  "...............HHHHHHHHHHHHH....................", // 19
  "................HHHHHHHHHHHH....................", // 20
  "................HHHHHHHHHHHH....................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 24
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 25
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 26
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 27
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 28
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 29
  "......jjJJJJJJ....YYyyYY..JJJJJJJJ..............", // 30
  "......jjJJJJJJ....YYyyYY..JJJJJJJJ..............", // 31
  "......jjYYYYjj....YYyyYY..jjYYYYjj..............", // 32
  "......jjYYYYjj....YYyyYY..jjYYYYjj..............", // 33
  "........AARR......YYyyYY....AARR................", // 34
  "........AARR......YYyyYY....AARR................", // 35
  "........SSSS......jjJJJJJJ..SSSS................", // 36
  "........SSSS......jjJJJJJJ..SSSS................", // 37
  "................jjJJJJJJJJjj....................", // 38
  "................jjJJJJJJJJjj....................", // 39
  "..............jjjjJJJJJJJJjjjj..................", // 40
  "..............jjjjJJJJJJJJjjjj..................", // 41
  "..............PPPPPPPPPPPPPPPP..................", // 42
  "..............PPPPPPPPPPPPPPPP..................", // 43
  "..............ppPPPPPPPPPPppPP..................", // 44
  "..............ppPPPPPPPPPPppPP..................", // 45
  "..............ppPPPPPPPP..PPPP..................", // 46
  "..............ppPPPPPPPP..PPPP..................", // 47
  "..............ccPPPP......ppPPPPPP..............", // 48
  "..............ccPPPP......ppPPPPPP..............", // 49
  "..............ccPPPP......ppPPPPPP..............", // 50
  "..............ccPPPP......ppPPPPPP..............", // 51
  "............ccPPPP........ppPPPPPP..............", // 52
  "............ccPPPP........ppPPPPPP..............", // 53
  "............ccPPPP........ppPPPPPP..............", // 54
  "............ccPPPP........ppPPPPPP..............", // 55
  "............bbBBBB........ppPPPPPP..............", // 56
  "............bbBBBB........ppPPPPPP..............", // 57
  "............BBBBBB........ppPPPPPP..............", // 58
  "............BBBBBB........ppPPPPPP..............", // 59
  "..........................BBBBBBBBBB............", // 60
  "..........................BBBBBBBBBB............", // 61
  "..........................bbBBBBBBBB............", // 62
  "..........................bbBBBBBBBB............", // 63
  "................................................", // 64
  "................................................", // 65
  "................................................", // 66
  "................................................", // 67
  "................................................", // 68
  "................................................", // 69
  "................................................", // 70
  "................................................", // 71
];

const FRAME_4: string[] = [
  "................HHHHHHHH........................", // 0
  "..............HHHhhhhhhHHH......................", // 1
  "............HHhhhhddddhhhhHH....................", // 2
  "...........HhhhddddDDddddhhhH...................", // 3
  "..........HhhhdddDDDDDDdddhhhH..................", // 4
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 5
  "..........HhhhhhhhhhhhhhhhhhhH..................", // 6
  "..........HhhhhhSSSSSSGGGGGGGG..................", // 7
  "..........HhhhhhSSGGGGggggggGG..................", // 8
  "..........HhhhhhSSGGggwwggggGG..................", // 9
  "..........HhhhhhSSGGggwwggggGG..................", // 10
  "..........HhhhhhSSGGggggggggGG..................", // 11
  "...........HHHHHSSGGGGGGGGGGGG..................", // 12
  "...........HHHHHSSSSSSssssGGGS..................", // 13
  "............HHHHSSSSSSSssssss...................", // 14
  "............HHHHHSSSssHHHHHHHH..................", // 15
  ".............HHHHHSSssHHssHH....................", // 16
  "..............HHHHHHHHHHHHHHHH..................", // 17
  "..............HHHHHHHHHHHHHHH...................", // 18
  "...............HHHHHHHHHHHHH....................", // 19
  "................HHHHHHHHHHHH....................", // 20
  "................HHHHHHHHHHHH....................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 24
  "........JJJJJJJJkkYYyyYYJJJJJJJJ................", // 25
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 26
  "......jjJJJJJJkkkkYYyyYYJJJJJJJJJJ..............", // 27
  "....jjJJJJJJkkkkkkYYyyYYJJJJJJJJJJJJ............", // 28
  "....jjJJJJJJkkkkkkYYyyYYJJJJJJJJJJJJ............", // 29
  "..jjYYYYJJJJJJ....YYyyYY....JJJJJJJJ............", // 30
  "..jjYYYYJJJJJJ....YYyyYY....JJJJJJJJ............", // 31
  "..AARR............YYyyYY....jjYYYYjj............", // 32
  "..AARR............YYyyYY....jjYYYYjj............", // 33
  "..SSSS..........jjYYYYYYYY....AARR..............", // 34
  "..SSSS..........jjYYYYYYYY....AARR..............", // 35
  "..............jjjjJJJJJJJJjj..SSSS..............", // 36
  "..............jjjjJJJJJJJJjj..SSSS..............", // 37
  "............jjjjjjJJJJJJJJjjjj..................", // 38
  "............jjjjjjJJJJJJJJjjjj..................", // 39
  "............jjjjjjJJJJPPPPPPPP..................", // 40
  "............jjjjjjJJJJPPPPPPPP..................", // 41
  "..............ppPPPPPPPPPPPPPP..................", // 42
  "..............ppPPPPPPPPPPPPPP..................", // 43
  "............ppPPPPPPPP....PPPPPP................", // 44
  "............ppPPPPPPPP....PPPPPP................", // 45
  "..........ppPPPPPPPP........PPPPPP..............", // 46
  "..........ppPPPPPPPP........PPPPPP..............", // 47
  "..........ppPPPPPP............PPPPPP............", // 48
  "..........ppPPPPPP............PPPPPP............", // 49
  "..........BBBBBBBB..............PPPPPP..........", // 50
  "..........BBBBBBBB..............PPPPPP..........", // 51
  "..........bbBBBBBB..............BBBBBBBB........", // 52
  "..........bbBBBBBB..............BBBBBBBB........", // 53
  "................................bbBBBBBB........", // 54
  "................................bbBBBBBB........", // 55
  "................................................", // 56
  "................................................", // 57
  "................................................", // 58
  "................................................", // 59
  "................................................", // 60
  "................................................", // 61
  "................................................", // 62
  "................................................", // 63
  "................................................", // 64
  "................................................", // 65
  "................................................", // 66
  "................................................", // 67
  "................................................", // 68
  "................................................", // 69
  "................................................", // 70
  "................................................", // 71
];

export const RAW_SPRITE_FRAMES = [FRAME_0, FRAME_1, FRAME_2, FRAME_3, FRAME_4];

/**
 * Pre-renders the 5 sprite frames directly at 1:1 scale (48x72 pixels) onto offscreen canvases.
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

    // Direct 1:1 pixel rendering onto 48x72 texture
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
