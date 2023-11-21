import {useState} from 'react';
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
import { Button, Grid, Paper, Typography, styled } from '@mui/material';
import { Tiles32 } from './Tiles32';
import { grey } from '@mui/material/colors';

type TileName = "L_0" | "L_90" | "L_180" | "L_270" | "I_0" | "I_90" | "I_180" | "I_270" | "Solid" | "Open" | "Pillar_0" | "Pillar_90" | "Pillar_180" | "Pillar_270" | "L_0_Highlight" | "L_90_Highlight" | "L_180_Highlight" | "L_270_Highlight" | "I_0_Highlight" | "I_90_Highlight" | "I_180_Highlight" | "I_270_Highlight" | "Solid_Highlight" | "Open_Highlight" | "Pillar_0_Highlight" | "Pillar_90_Highlight" | "Pillar_180_Highlight" | "Pillar_270_Highlight";
type TileData = typeof L_0 | typeof L_90 | typeof L_180 | typeof L_270 | typeof I_0 | typeof I_90 | typeof I_180 | typeof I_270 | typeof Solid | typeof Open | typeof Pillar_0 | typeof Pillar_90 | typeof Pillar_180 | typeof Pillar_270;

type TileType = {
  name: TileName,
  data: TileData
}

const tilePalette: Array<TileType> = [
  { name: "L_0", data: L_0 }, { name: "L_90", data: L_90 }, { name: "L_180", data: L_180 }, { name: "L_270", data: L_270 }, { name: "I_0", data: I_0 }, { name: "I_90", data: I_90 },
  { name: "I_180", data: I_180 }, { name: "I_270", data: I_270 }, { name: "Solid", data: Solid }, { name: "Open", data: Open }, { name: "Pillar_0", data: Pillar_0 },
  { name: "Pillar_90", data: Pillar_90 }, { name: "Pillar_180", data: Pillar_180 }, { name: "Pillar_270", data: Pillar_270 }
];

type EditingStates = "NOT EDITING" | "EDITING";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

const TilePalette = (props: { changeTile: any; changeEditMode: any}) => {
  const { changeTile, changeEditMode } = props;
  const [paletteTile, setPaletteTile] = useState<TileName>("Solid");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handlePaletteClick = (index: number) => {
    const tiles32 = Object.create(Tiles32);
    const tileName = tiles32.getTileName(index);
    const tile = tiles32.getTileData(tileName);
    setPaletteTile(tileName);
    changeTile(tileName);
  }

  const getDisplayTiles = () => {
    const returnArray = [];
    for (let index = 0; index < tilePalette.length; index++) {
      const tileImage = tilePalette[index].data;
      let newBit = (
        <Grid item key={index}>
          <Button onClick={() => handlePaletteClick(index)} style={{ minWidth: "32px", maxWidth: "32px", minHeight: "32px", maxHeight: "32px" }}>
            {<img src={tileImage} />}
          </Button>
        </Grid>
      )
      returnArray.push(newBit);
    };
    return (
      <Grid container spacing="3" sx={{ marginLeft: 2, marginBottom: 2 }}>
        {returnArray}
      </Grid>
    );
  }

  const getPaletteTile = () => {
    const tiles32 = Object.create(Tiles32);
    return tiles32.getTileData(paletteTile);
  }

  const getEditModeBtnText = (): EditingStates => {
    if (isEditing) return "EDITING";
    return "NOT EDITING";
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    changeEditMode(!isEditing);
  }

  return (
    <Paper sx={{ marginTop: "25px", marginRight: "15px", marginLeft: "15px", backgroundColor: "lightGray", minWidth: "244px", maxWidth: "264px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography textAlign="center">Tile Palette</Typography>
        </Grid>
        {getDisplayTiles()}
      </Grid>
      <Grid container sx={{marginLeft: 1}}>
        <Grid item xs={6} sx={{marginTop: 1}}>
          <StyledButton variant="contained" onClick={toggleEditMode}>{getEditModeBtnText()}</StyledButton>
        </Grid>
        <Grid item xs={6}>
          <Typography>Selected Block</Typography><img src={getPaletteTile()} />
        </Grid>
      </Grid>
    </Paper>

  );
}

export default TilePalette;