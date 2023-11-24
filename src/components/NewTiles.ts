export type TileName = "L_0" | "L_90" | "L_180" | "L_270" | "I_0" | "I_90" | "I_180" | "I_270" | "Solid" | "Open" | "Pillar_0" | "Pillar_90" | "Pillar_180" | "Pillar_270" | "L_0_Highlight" | "L_90_Highlight" | "L_180_Highlight" | "L_270_Highlight" | "I_0_Highlight" | "I_90_Highlight" | "I_180_Highlight" | "I_270_Highlight" | "Solid_Highlight" | "Open_Highlight" | "Pillar_0_Highlight" | "Pillar_90_Highlight" | "Pillar_180_Highlight" | "Pillar_270_Highlight" | "L_0_GO" | "L_90_GO" | "L_180_GO" | "L_270_GO" | "I_0_GO" | "I_90_GO" | "I_180_GO" | "I_270_GO" | "Solid_GO" | "Open_GO" | "Pillar_0_GO" | "Pillar_90_GO" | "Pillar_180_GO" | "Pillar_270_GO" | "L_0_Highlight_GO" | "L_90_Highlight_GO" | "L_180_Highlight_GO" | "L_270_Highlight_GO" | "I_0_Highlight_GO" | "I_90_Highlight_GO" | "I_180_Highlight_GO" | "I_270_Highlight_GO" | "Solid_Highlight_GO" | "Open_Highlight_GO" | "Pillar_0_Highlight_GO" | "Pillar_90_Highlight_GO" | "Pillar_180_Highlight_GO" | "Pillar_270_Highlight_GO";

export type NewTiles = {
  index: number;
  tileName: TileName;
  oldTileName: TileName;
}

export const makeNewTile = (index: number, tileName: TileName): NewTiles => {
  return { index: index, tileName: tileName, oldTileName: tileName};
}
