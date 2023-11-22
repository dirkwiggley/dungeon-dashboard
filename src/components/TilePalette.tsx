import { FormEvent, useState } from 'react';
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
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, Stack, TextField, Typography, styled } from '@mui/material';
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

const BTN_TXT_SELECT = "SELECT";
const BTN_TXT_EDIT = "EDIT";
const BTN_TXT_BUILD_ROOM = "BUILD ROOM";
type EditBtnText = typeof BTN_TXT_SELECT | typeof BTN_TXT_EDIT | typeof BTN_TXT_BUILD_ROOM;

export const SELECT = "Select";
export const EDIT = "Edit";
export const BUILD_ROOM = "Build Room";
export const INCREMENT = "Increment";
export type EditorModes = typeof SELECT | typeof EDIT | typeof BUILD_ROOM | typeof INCREMENT;


const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: grey[400],
  borderRadius: 25,
  minWidth: "90%",
  maxWidth: "90%",
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

const TilePalette = (props: { changeTile: any; changeEditMode: any, handleCommit: any, handleCancel: any }) => {
  const { changeTile, changeEditMode, handleCommit, handleCancel } = props;
  const [paletteTile, setPaletteTile] = useState<TileName>("Solid");
  const [editorMode, setEditorMode] = useState<EditorModes>(SELECT);
  const [openEnterNameDlg, setOpenEnterNameDlg] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");

  const handlePaletteClick = (index: number) => {
    const tiles32 = Object.create(Tiles32);
    const tileName = tiles32.getTileName(index);
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

  const getEditModeBtnText = (): EditBtnText => {
    switch (editorMode) {
      case SELECT:
        return BTN_TXT_SELECT;
      case EDIT:
        return BTN_TXT_EDIT;
      case BUILD_ROOM:
        return BTN_TXT_BUILD_ROOM;
      default:
        return BTN_TXT_SELECT;
    }
  }

  function onChangeEditMode(mode: EditorModes | null = INCREMENT) {
    // use default parameter value when null
    mode = mode ?? INCREMENT;

    if (mode === INCREMENT) {
      switch (editorMode) {
        case SELECT:
          setEditorMode(EDIT);
          mode = EDIT;
          break;
        case EDIT:
          setEditorMode(BUILD_ROOM);
          mode = BUILD_ROOM;
          break;
        case BUILD_ROOM:
          setEditorMode(SELECT);
          mode = SELECT;
          break;
        default:
          setEditorMode(SELECT);
      }
    } else {
      setEditorMode(mode);
    }
    changeEditMode(mode);
  }

  const submitRoom = () => {
    if (roomName.length > 0) {
      handleCommit(roomName);
    }
    setOpenEnterNameDlg(false);
  }

  const onCommit = () => {
    if (editorMode === BUILD_ROOM) {
      setOpenEnterNameDlg(true);
    } else {
      handleCommit();
    }
  }

  const onCancel = () => {
    onChangeEditMode(SELECT);
    setRoomName("");
    handleCancel();
  }

  const handleClose = () => {
    onChangeEditMode(SELECT);
    setEditorMode(SELECT);
    setOpenEnterNameDlg(false);
    setRoomName("");
  }

  const handleOnInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setRoomName(value);
  }

  const getRoomButtons = () => {
    if (editorMode === BUILD_ROOM || editorMode === EDIT) {
      return (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ marginBottom: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "100%", maxWidth: "100%" }}>
              <StyledButton variant="contained" onClick={onCommit}>Commit</StyledButton>
            </Grid>
            <Grid item>
              <Dialog open={openEnterNameDlg} onClose={() => handleClose()}>
                <DialogTitle>Enter Room Name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    A new room requires a unique name.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => handleOnInput(event)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button onClick={submitRoom}>Submit</Button>
                </DialogActions>
              </Dialog>
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
          <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography textAlign="center">Tile Palette</Typography>
          </Grid>
          {getDisplayTiles()}
        </Grid>

        <Box border={1} sx={{ marginRight: 3, marginLeft: 3 }}>
          <Grid container>
            <Grid item xs={8}>
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: 2, marginTop: 6, marginBottom: 6 }}>
                <Typography sx={{ marginTop: 0.5 }}>Selected Block</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "left", marginRight: 2, marginTop: 6, marginBottom: 6 }}>
                <img src={getPaletteTile()} />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container sx={{ spacing: 1 }}>
          <Grid item xs={12} sx={{ marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "100%", maxWidth: "100%" }}>
            <StyledButton variant="contained" onClick={() => onChangeEditMode(INCREMENT)}>{getEditModeBtnText()}</StyledButton>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "100%", maxWidth: "100%" }}>
            <StyledButton variant="contained" onClick={onCancel}>Cancel</StyledButton>
          </Grid>

        </Grid>
        {getRoomButtons()}
      </Stack>
    </Paper>
  );
}


export default TilePalette;