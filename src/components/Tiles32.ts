import L_0 from '../assets/32_L_0_Base.png';
import L_90 from '../assets/32_L_90_Base.png';
import L_180 from '../assets/32_L_180_Base.png';
import L_270 from '../assets/32_L_270_Base.png';
import I_0 from '../assets/32_I_0_Base.png';
import I_90 from '../assets/32_I_90_Base.png';
import I_180 from '../assets/32_I_180_Base.png';
import I_270 from '../assets/32_I_270_Base.png';
import Solid from '../assets/32_Solid.png';
import Open from '../assets/32_Open_Base.png';
import Pillar_0 from '../assets/32_Pillar_0_Base.png';
import Pillar_90 from '../assets/32_Pillar_90_Base.png';
import Pillar_180 from '../assets/32_Pillar_180_Base.png';
import Pillar_270 from '../assets/32_Pillar_270_Base.png';
import L_0_Highlight from '../assets/32_L_0_Highlight.png';
import L_90_Highlight from '../assets/32_L_90_Highlight.png';
import L_180_Highlight from '../assets/32_L_180_Highlight.png';
import L_270_Highlight from '../assets/32_L_270_Highlight.png';
import I_0_Highlight from '../assets/32_I_0_Highlight.png';
import I_90_Highlight from '../assets/32_I_90_Highlight.png';
import I_180_Highlight from '../assets/32_I_180_Highlight.png';
import I_270_Highlight from '../assets/32_I_270_Highlight.png';
import Solid_Highlight from '../assets/32_Solid_Highlight.png';
import Open_Highlight from '../assets/32_Open_Highlight.png';
import Pillar_0_Highlight from '../assets/32_Pillar_0_Highlight.png';
import Pillar_90_Highlight from '../assets/32_Pillar_90_Highlight.png';
import Pillar_180_Highlight from '../assets/32_Pillar_180_Highlight.png';
import Pillar_270_Highlight from '../assets/32_Pillar_270_Highlight.png';
import {TileName} from './NewTiles';


type TileData = typeof L_0 | typeof L_90 | typeof L_180 | typeof L_270 | typeof I_0 | typeof I_90 | typeof I_180 | typeof I_270 | typeof Solid | typeof Open | typeof Pillar_0 | typeof Pillar_90 | typeof Pillar_180 | typeof Pillar_270 | typeof L_0_Highlight | typeof L_90_Highlight | typeof L_180_Highlight | typeof L_270_Highlight | typeof I_0_Highlight | typeof I_90_Highlight | typeof I_180_Highlight | typeof I_270_Highlight | typeof Solid_Highlight | typeof Open_Highlight | typeof Pillar_0_Highlight | typeof Pillar_90_Highlight | typeof Pillar_180_Highlight | typeof Pillar_270_Highlight;

type TileType = {
  name: TileName,
  data: TileData
}
const tiles: Array<TileType> = [
  { name: "L_0", data: L_0},
  { name: "L_90", data: L_90},
  { name: "L_180", data: L_180},
  { name: "L_270", data: L_270},
  { name: "I_0", data: I_0},
  { name: "I_90", data: I_90},
  { name: "I_180", data: I_180},
  { name: "I_270", data: I_270},
  { name: "Solid", data: Solid},
  { name: "Open", data: Open},
  { name: "Pillar_0", data: Pillar_0},
  { name: "Pillar_90", data: Pillar_90},
  { name: "Pillar_180", data: Pillar_180},
  { name: "Pillar_270", data: Pillar_270},
  { name: "L_0_Highlight", data: L_0_Highlight},
  { name: "L_90_Highlight", data: L_90_Highlight},
  { name: "L_180_Highlight", data: L_180_Highlight},
  { name: "L_270_Highlight", data: L_270_Highlight},
  { name: "I_0_Highlight", data: I_0_Highlight},
  { name: "I_90_Highlight", data: I_90_Highlight},
  { name: "I_180_Highlight", data: I_180_Highlight},
  { name: "I_270_Highlight", data: I_270_Highlight},
  { name: "Solid_Highlight", data: Solid_Highlight},
  { name: "Open_Highlight", data: Open_Highlight},
  { name: "Pillar_0_Highlight", data: Pillar_0_Highlight},
  { name: "Pillar_90_Highlight", data: Pillar_90_Highlight},
  { name: "Pillar_180_Highlight", data: Pillar_180_Highlight},
  { name: "Pillar_270_Highlight", data: Pillar_270_Highlight},
]

export const Tiles32 = {
  getTiles(): Array<TileType> {
    return tiles;
  },

  getTileName(index: number): TileName {
    return tiles[index].name;
  },

  getTileData(tileName: TileName): TileData {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].name === tileName) {
        return tiles[i].data;
      }
    }
    return "No data found";
  },

  getTileNames(): Array<TileName> {
    const tileNames = new Array<TileName>();
    for (let i = 0; i < tiles.length; i++) {
        tileNames.push(tiles[i].name);
    }
    return tileNames;
  },

  getSplitTileNames(): [ Array<TileName>, Array<TileName> ] {
    const allTileNames = this.getTileNames();
    const highlightArray = new Array<TileName>();
    const baseArray = new Array<TileName>();
    for (let i = 0; i < allTileNames.length; i++) {
      if (allTileNames[i].includes('Highlight')) {
        highlightArray.push(allTileNames[i]);
      } else {
        baseArray.push(allTileNames[i]);
      }
    }
    return [highlightArray, baseArray];
  }
}