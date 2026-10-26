/**
 * Double-Size (48x72) Pixel Tarun Runner Sprite Matrix & Texture Generator
 * Handcrafted authentic side-profile pixel art for the UX Minigame canvas runner.
 * Enhanced directly from reference photo:
 * - Round metallic silver sunglasses with reflection
 * - Warm smile with teeth visible & neatly trimmed beard
 * - Intricate gold floral zardozi embroidery across crimson sherwani
 * - Silver kada bracelet & red kalava thread on wrists
 * - 4-frame running cycle + 1 airborne leap pose
 */

export const SPRITE_WIDTH = 48;
export const SPRITE_HEIGHT = 72;

export const TARUN_SPRITE_PALETTE: Record<string, string> = {
  '.': 'transparent',
  'H': '#120D17',
  'h': '#241B2D',
  'd': '#3D2F4A',
  'D': '#5A466A',
  'S': '#DC9B6E',
  's': '#B9774B',
  'e': '#8C522F',
  'w': '#FFFFFF',
  'G': '#0B0B0E',
  'g': '#2A3644',
  'l': '#5B7694',
  'M': '#D4DAE2',
  'm': '#8A92A0',
  'J': '#C72430',
  'j': '#80121A',
  'k': '#E53846',
  'K': '#F25260',
  'Y': '#F6BC36',
  'y': '#C79020',
  'z': '#7A540E',
  'Z': '#FFF1A8',
  'T': '#141418',
  't': '#25252E',
  'R': '#D82632',
  'A': '#E6EBF2',
  'P': '#1A1A22',
  'p': '#101015',
  'c': '#2C2C38',
  'B': '#08080C',
  'b': '#22222D',
  'x': '#3D3D50',
};

const FRAME_0: string[] = [
  "..............HHHHHHHHHHHH......................", // 0
  "..............HHHHHHHHHHHH......................", // 1
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 2
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 3
  "........HHhhhhhhddddDDddhhhhhhHH................", // 4
  "........HHhhhhhhdddDDdddhhhhhhHH................", // 5
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 6
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 7
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 8
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 9
  "......HHhhhhhhhhSSSSSSSMMMMMMMGG................", // 10
  "......HHhhhhhhhhSSSSSSMGGllGMMGG................", // 11
  "......HH....hhhhSSSSGGMGGlllGMGG................", // 12
  "......HH....hhhhSSSSGGMGGglGMMGG................", // 13
  "......HH....hhhhSSSSGGGMMMMMMMMS................", // 14
  "......HH....hhhhSSSSGGGGggggggSs................", // 15
  "........HHHHHHHHHHSSSSssHHHHHHHH................", // 16
  "........HHHHHHHHHHSSSSssHHwwwHHs................", // 17
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 18
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 19
  "............HHHHHHHHHHHHHHHHHH..................", // 20
  "............HHHHHHHHHHHHHHHHHH..................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYZYYYJJJJJJJJ................", // 24
  "........JJJJYJJJkkYZyYyZJJJJJYJJ................", // 25
  "......jjJJJZJykkkkZyyYZyJJJJJJyJJJ..............", // 26
  "......jjJJYJJJkkkkYYYZYYJJJJJJJZJJ..............", // 27
  "....jjJJJJJJkkkkkkYyZYyyJJJJJJJJYJJJ............", // 28
  "....jjJJJJJJkkkkkkYZyYyZJJJJJJJJJJJJ............", // 29
  "....jjJJJJJJ......ZYYYZYJJJJJJJJJJJJ............", // 30
  "....jjJJJJJJ......YyyZyyJJJJJJJJJJJJ............", // 31
  "....jjYYYYJJ......YyZYyy..JJJJJJJJ..............", // 32
  "....jjYYYYJJ......YZYYYZ..JJJJJJJJ..............", // 33
  "......ARAR........ZyyYZy....jjZyyYjj............", // 34
  "......ssSS........YyyZyy....jjYyyZjj............", // 35
  "......SSSS........jjJJJJJJ....ARAS..............", // 36
  "......SSSS........jjJJJJJJ....ssSS..............", // 37
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
  "..............HHHHHHHHHHHH......................", // 0
  "..............HHHHHHHHHHHH......................", // 1
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 2
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 3
  "........HHhhhhhhddddDDddhhhhhhHH................", // 4
  "........HHhhhhhhdddDDdddhhhhhhHH................", // 5
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 6
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 7
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 8
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 9
  "......HHhhhhhhhhSSSSSSSMMMMMMMGG................", // 10
  "......HHhhhhhhhhSSSSSSMGGllGMMGG................", // 11
  "......HH....hhhhSSSSGGMGGlllGMGG................", // 12
  "......HH....hhhhSSSSGGMGGglGMMGG................", // 13
  "......HH....hhhhSSSSGGGMMMMMMMMS................", // 14
  "......HH....hhhhSSSSGGGGggggggSs................", // 15
  "........HHHHHHHHHHSSSSssHHHHHHHH................", // 16
  "........HHHHHHHHHHSSSSssHHwwwHHs................", // 17
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 18
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 19
  "............HHHHHHHHHHHHHHHHHH..................", // 20
  "............HHHHHHHHHHHHHHHHHH..................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYZYYYJJJJJJJJ................", // 24
  "........JJJJYJJJkkYZyYyZJJJJJYJJ................", // 25
  "......jjJJJZJykkkkZyyYZyJJJJJJyJJJ..............", // 26
  "......jjJJYJJJkkkkYYYZYYJJJJJJJZJJ..............", // 27
  "......jjJJJJJJkkkkYyZYyyJJJJJJJJYJ..............", // 28
  "......jjJJJJJJkkkkYZyYyZJJJJJJJJJJ..............", // 29
  "......jjJJJJJJ....ZYYYZY..JJJJJJJJ..............", // 30
  "......jjJJJJJJ....YyyZyy..JJJJJJJJ..............", // 31
  "......jjYYYYjj....YyZYyy..jjZyYyjj..............", // 32
  "......jjYYYYjj....YZYYYZ..jjYYYZjj..............", // 33
  "........ARAR......ZyyYZy....ARAS................", // 34
  "........ssSS......YyyZyy....ssSS................", // 35
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
  "..............HHHHHHHHHHHH......................", // 0
  "..............HHHHHHHHHHHH......................", // 1
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 2
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 3
  "........HHhhhhhhddddDDddhhhhhhHH................", // 4
  "........HHhhhhhhdddDDdddhhhhhhHH................", // 5
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 6
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 7
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 8
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 9
  "......HHhhhhhhhhSSSSSSSMMMMMMMGG................", // 10
  "......HHhhhhhhhhSSSSSSMGGllGMMGG................", // 11
  "......HH....hhhhSSSSGGMGGlllGMGG................", // 12
  "......HH....hhhhSSSSGGMGGglGMMGG................", // 13
  "......HH....hhhhSSSSGGGMMMMMMMMS................", // 14
  "......HH....hhhhSSSSGGGGggggggSs................", // 15
  "........HHHHHHHHHHSSSSssHHHHHHHH................", // 16
  "........HHHHHHHHHHSSSSssHHwwwHHs................", // 17
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 18
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 19
  "............HHHHHHHHHHHHHHHHHH..................", // 20
  "............HHHHHHHHHHHHHHHHHH..................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYZYYYJJJJJJJJ................", // 24
  "........JJJJYJJJkkYZyYyZJJJJJYJJ................", // 25
  "......jjJJJZJykkkkZyyYZyJJJJJJyJJJ..............", // 26
  "......jjJJYJJJkkkkYYYZYYJJJJJJJZJJ..............", // 27
  "........JJJJJJkkkkYyZYyyjjJJJJJJYJ..............", // 28
  "........JJJJJJkkkkYZyYyZjjJJJJJJJJ..............", // 29
  "......JJJJJJJJ....ZYYYZY..JJJJJJJJJJ............", // 30
  "......JJJJJJJJ....YyyZyy..JJJJJJJJJJ............", // 31
  "....jjYYYYjj......YyZYyy....JJJJJJJJ............", // 32
  "....jjYYYYjj......YZYYYZ....JJJJJJJJ............", // 33
  "....ssAR..........ZyyYZy....jjZyyYjj............", // 34
  "....ssSS..........YyyZyy....jjYyyZjj............", // 35
  "....SSSS..........jjJJJJJJ....ARAS..............", // 36
  "....SSSS..........jjJJJJJJ....ssSS..............", // 37
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
  "..............HHHHHHHHHHHH......................", // 0
  "..............HHHHHHHHHHHH......................", // 1
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 2
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 3
  "........HHhhhhhhddddDDddhhhhhhHH................", // 4
  "........HHhhhhhhdddDDdddhhhhhhHH................", // 5
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 6
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 7
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 8
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 9
  "......HHhhhhhhhhSSSSSSSMMMMMMMGG................", // 10
  "......HHhhhhhhhhSSSSSSMGGllGMMGG................", // 11
  "......HH....hhhhSSSSGGMGGlllGMGG................", // 12
  "......HH....hhhhSSSSGGMGGglGMMGG................", // 13
  "......HH....hhhhSSSSGGGMMMMMMMMS................", // 14
  "......HH....hhhhSSSSGGGGggggggSs................", // 15
  "........HHHHHHHHHHSSSSssHHHHHHHH................", // 16
  "........HHHHHHHHHHSSSSssHHwwwHHs................", // 17
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 18
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 19
  "............HHHHHHHHHHHHHHHHHH..................", // 20
  "............HHHHHHHHHHHHHHHHHH..................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYZYYYJJJJJJJJ................", // 24
  "........JJJJYJJJkkYZyYyZJJJJJYJJ................", // 25
  "......jjJJJZJykkkkZyyYZyJJJJJJyJJJ..............", // 26
  "......jjJJYJJJkkkkYYYZYYJJJJJJJZJJ..............", // 27
  "......jjJJJJJJkkkkYyZYyyJJJJJJJJYJ..............", // 28
  "......jjJJJJJJkkkkYZyYyZJJJJJJJJJJ..............", // 29
  "......jjJJJJJJ....ZYYYZY..JJJJJJJJ..............", // 30
  "......jjJJJJJJ....YyyZyy..JJJJJJJJ..............", // 31
  "......jjYYYYjj....YyZYyy..jjZyYyjj..............", // 32
  "......jjYYYYjj....YZYYYZ..jjYYYZjj..............", // 33
  "........ARAR......ZyyYZy....ARAS................", // 34
  "........ssSS......YyyZyy....ssSS................", // 35
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
  "..............HHHHHHHHHHHH......................", // 0
  "..............HHHHHHHHHHHH......................", // 1
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 2
  "..........HHHHhhhhhhhhhhhhHHHH..................", // 3
  "........HHhhhhhhddddDDddhhhhhhHH................", // 4
  "........HHhhhhhhdddDDdddhhhhhhHH................", // 5
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 6
  "......HHhhhhhhddddddddddddhhhhhhHH..............", // 7
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 8
  "......HHhhhhhhhhhhhhhhhhhhhhhhhhHH..............", // 9
  "......HHhhhhhhhhSSSSSSSMMMMMMMGG................", // 10
  "......HHhhhhhhhhSSSSSSMGGllGMMGG................", // 11
  "......HH....hhhhSSSSGGMGGlllGMGG................", // 12
  "......HH....hhhhSSSSGGMGGglGMMGG................", // 13
  "......HH....hhhhSSSSGGGMMMMMMMMS................", // 14
  "......HH....hhhhSSSSGGGGggggggSs................", // 15
  "........HHHHHHHHHHSSSSssHHHHHHHH................", // 16
  "........HHHHHHHHHHSSSSssHHwwwHHs................", // 17
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 18
  "..........HHHHHHHHHHHHHHHHHHHHHH................", // 19
  "............HHHHHHHHHHHHHHHHHH..................", // 20
  "............HHHHHHHHHHHHHHHHHH..................", // 21
  "............TTTTJJJJJJJJJJJJ....................", // 22
  "............TTTTJJJJJJJJJJJJ....................", // 23
  "........JJJJJJJJkkYYZYYYJJJJJJJJ................", // 24
  "........JJJJYJJJkkYZyYyZJJJJJYJJ................", // 25
  "......jjJJJZJykkkkZyyYZyJJJJJJyJJJ..............", // 26
  "......jjJJYJJJkkkkYYYZYYJJJJJJJZJJ..............", // 27
  "....jjJJJJJJkkkkkkYyZYyyJJJJJJJJYJJJ............", // 28
  "....jjJJJJJJkkkkkkYZyYyZJJJJJJJJJJJJ............", // 29
  "..jjYYYYJJJJJJ....ZYYYZY....JJJJJJJJ............", // 30
  "..jjYYYYJJJJJJ....YyyZyy....JJJJJJJJ............", // 31
  "..ssAR............YyZYyy....jjYyZYjj............", // 32
  "..ssSS............YZYYYZ....jjYZYYjj............", // 33
  "..SSSS..........jjZyyYZyYy....AsAR..............", // 34
  "..SSSS..........jjYyyZyyYZ....ssSS..............", // 35
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
 * Pre-renders the 5 double-size sprite frames onto offscreen HTMLCanvasElement textures.
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
