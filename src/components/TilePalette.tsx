import { useState } from 'react';
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
import { Box, Button, Divider, Grid, Paper, Stack, Typography, styled } from '@mui/material';
import { Tiles32 } from './Tiles32';
import { grey } from '@mui/material/colors';
import { TileName } from './NewTiles';

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

const TilePalette = (props: { changeTile: any; changeEditMode: any, handleCommit: any, handleCancel: any }) => {
  const { changeTile, changeEditMode, handleCommit, handleCancel } = props;
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
      <Grid container spacing={1} sx={{ marginLeft: 1, marginBottom: 2 }}>
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

  const onCommit = () => {
    toggleEditMode();
    handleCommit();
  }

  const onCancel = () => {
    toggleEditMode();
    handleCancel();
  }

  const getRoomButtons = () => {
    if (isEditing) {
      return (
        <>
          <Divider sx={{ marginBottom: 1 }} />
          <Grid container spacing={1} sx={{ width: "100%" }}>
            <Grid item xs={7} sx={{ marginBottom: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledButton variant="contained">Select Tiles</StyledButton>
              </Box>
            </Grid>
            <Grid item xs={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ marginBottom: 1, display: "flex", alignItems: "center" }}>
                <StyledButton variant="contained" onClick={onCommit}>Commit</StyledButton>
              </Box>
            </Grid>
            <Grid item >
              <Box sx={{ marginLeft: 1, marginBottom: 1, display: "flex", justifyContent: "center" }}>
                <StyledButton variant="contained">Create Room</StyledButton>
              </Box>
            </Grid>
            <Grid item >
              <Box sx={{ marginLeft: 1, marginBottom: 1, display: "flex", justifyContent: "center" }}>
                <StyledButton variant="contained" onClick={onCancel}>Cancel</StyledButton>
              </Box>
            </Grid>
          </Grid>
        </>
      )
    }
    return null;
  }

  return (
    <Paper sx={{ marginTop: "25px", marginLeft: 2, marginRight: 2, backgroundColor: "lightGray", minWidth: "254px", maxWidth: "264px" }}>
      <Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{marginTop: 2, marginBottom: 2}}>
            <Typography textAlign="center">Tile Palette</Typography>
          </Grid>
          {getDisplayTiles()}
        </Grid>
        <Grid container sx={{ marginLeft: 1 }}>
          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <StyledButton variant="contained" onClick={toggleEditMode}>{getEditModeBtnText()}</StyledButton>
          </Grid>

          <Grid item xs={6}>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: 2, marginTop: 6, marginBottom: 6 }}>
              <Typography sx={{ }}>Selected Block</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "left", marginRight: 2, marginTop: 6, marginBottom: 6 }}>
              <img src={getPaletteTile()} />
            </Box>
          </Grid>
        </Grid>
        {getRoomButtons()}
      </Stack>
    </Paper>
  );
}


export default TilePalette;