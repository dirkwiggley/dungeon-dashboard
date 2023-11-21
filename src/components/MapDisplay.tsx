import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { MAX_COLUMNS, MAX_ROWS, Rooms, getRoomName, getRoomTiles, getUnusedTileIndexes } from './RoomDefinitions';
import TilePalette from './TilePalette';
import { Tiles32 } from './Tiles32';
import { Tiles64 } from './Tiles64';
import theme from '../theme';

type TileName = "L_0" | "L_90" | "L_180" | "L_270" | "I_0" | "I_90" | "I_180" | "I_270" | "Solid" | "Open" | "Pillar_0" | "Pillar_90" | "Pillar_180" | "Pillar_270" | "L_0_Highlight" | "L_90_Highlight" | "L_180_Highlight" | "L_270_Highlight" | "I_0_Highlight" | "I_90_Highlight" | "I_180_Highlight" | "I_270_Highlight" | "Solid_Highlight" | "Open_Highlight" | "Pillar_0_Highlight" | "Pillar_90_Highlight" | "Pillar_180_Highlight" | "Pillar_270_Highlight";

let dungeonMap: Array<TileName> = [
  "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Open",
  "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid",
  "Solid", "L_90", "I_90", "L_180", "Solid", "Solid", "L_90", "Open",
  "L_180", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid",
  "Solid", "I_0", "Open", "Open", "Open", "Open", "Open", "Open",
  "Open", "Open", "Open", "Open", "Open", "Open", "Open", "Solid",
  "Solid", "L_0", "I_270", "L_270", "Solid", "Solid", "L_0", "Open",
  "L_270", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid",
  "L_90", "I_90", "I_90", "L_180", "I_0", "Open", "Open", "Open",
  "Open", "Open", "I_180", "Solid", "Solid", "Solid", "Solid", "Solid",
  "I_0", "Open", "Open", "Pillar_180", "Pillar_90", "Open", "Open", "Open",
  "Open", "Open", "I_180", "Solid", "Solid", "Solid", "Solid", "Solid",
  "I_0", "Open", "Open", "Pillar_270", "Pillar_0", "Open", "Open", "Open",
  "Open", "Open", "I_180", "Solid", "Solid", "Solid", "Solid", "Solid",
  "L_0", "I_270", "I_270", "L_270", "I_0", "Open", "Open", "Open",
  "Open", "Open", "I_180", "Solid", "Solid", "Solid", "Solid", "Solid",
  "Solid", "Solid", "Solid", "Solid", "I_0", "Open", "Open", "Open",
  "Open", "Open", "I_180", "Solid", "Solid", "Solid", "Solid", "Solid",
  "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid",
  "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid", "Solid",
]

const THIRTY_TWO_PX = "32px";
const SIXTY_FOUR_PX = "64px";
type SizeSelection = typeof THIRTY_TWO_PX | typeof SIXTY_FOUR_PX;
const HIGHLIGHT = "_Highlight";
const NO_ROOM_SELECTED = "No room selected";


function MapDisplay() {
  const [roomName, setRoomName] = useState<string>('');
  const [tileSize, setTileSize] = useState<string>(THIRTY_TWO_PX as string);
  const [columns, setColumns] = useState<number>(MAX_COLUMNS + 1);
  const [toggleable, setToggleable] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [paletteTile, setPaletteTile] = useState<TileName>("Solid");

  const getTileManager = () => {
    if (tileSize === THIRTY_TWO_PX) {
      return Object.create(Tiles32);
    } else {
      return Object.create(Tiles64);
    }
  }

  const findNewTileName = (index: number): TileName => {
    let dungeonTileName = dungeonMap[index];
    if (dungeonTileName.includes(HIGHLIGHT)) {
      dungeonTileName = dungeonTileName.slice(0, dungeonTileName.length - 10) as TileName;
    } else {
      dungeonTileName = dungeonTileName + HIGHLIGHT as TileName;
    }

    return dungeonTileName;
  }

  const unsetOtherRooms = (selectedRoomName: string) => {
    for (let i = 0; i < Rooms.length; i++) {
      const currentRoomName = Rooms[i].name;
      if (currentRoomName !== selectedRoomName) {
        const roomTileIndexes = Rooms[i].tiles;
        const firstRoomTileIndex = roomTileIndexes[0];
        if (dungeonMap[firstRoomTileIndex].includes(HIGHLIGHT)) {
          toggleDungeonTiles(roomTileIndexes);
        }
      }
    }
  }

  const unsetRoom = (selectedRoomName: string) => {
    const roomTileIndexes = getRoomTiles(selectedRoomName);
    const firstRoomTileIndex = roomTileIndexes[0];
    if (dungeonMap[firstRoomTileIndex].includes(HIGHLIGHT)) {
      toggleDungeonTiles(roomTileIndexes);
    }
  }

  const unsetUnused = () => {
    const unusedIndexes = getUnusedTileIndexes();
    let redraw = false;
    unusedIndexes.forEach(index => {
      if (dungeonMap[index].includes(HIGHLIGHT)) {
        dungeonMap[index] = findNewTileName(index);
        redraw = true;
      }
    });
    if (redraw) {
      setToggleable(!toggleable);
    }
  }

  const toggleDungeonTile = (index: number) => {
    dungeonMap[index] = findNewTileName(index);
    setToggleable(!toggleable);
  }

  const toggleDungeonTiles = (tileIndexes: Array<number>) => {
    for (let index = 0; index < tileIndexes.length; index++) {
      const currentTileIndex = tileIndexes[index];
      dungeonMap[currentTileIndex] = findNewTileName(currentTileIndex);
    }
    setToggleable(!toggleable);
  }

  const roomCheck = (index: number) => {
    let selectedRoomName = getRoomName(index);
    if (selectedRoomName === '') {
      selectedRoomName = NO_ROOM_SELECTED;
      toggleDungeonTile(index);
    } else {
      const roomTileIndexes = getRoomTiles(selectedRoomName);
      toggleDungeonTiles(roomTileIndexes);
    }
    unsetOtherRooms(selectedRoomName);
    setRoomName(selectedRoomName);
  }

  const getMaxWidth = () => {
    if (tileSize === THIRTY_TWO_PX) {
      return 32 * columns;
    } else {
      return 64 * columns;
    }
  }

  const getDisplayTiles = () => {
    const returnArray = [];
    for (let index = 0; index < dungeonMap.length; index++) {
      const tileName = dungeonMap[index];
      const data = getTileManager().getTileData(tileName);
      let newBit = (
        <Grid item wrap="nowrap" key={index} xs={1} style={{ maxWidth: tileSize, maxHeight: tileSize }}>
          <Button onClick={() => roomCheck(index)} style={{ minWidth: tileSize, maxWidth: tileSize, minHeight: tileSize, maxHeight: tileSize }}>
            {<img src={data} />}
          </Button>
        </Grid>);
      returnArray.push(newBit);
    };
    return (
      <Grid container sx={{ marginLeft: "15px", columns: { columns }, overflowY: "scroll", overflowX: "scroll" }} spacing={0}>
        {returnArray}
      </Grid>
    )
  }

  const handleSizeChange = (event: { target: { value: any; }; }) => {
    setTileSize(event.target.value);
  }

  const handleChangePaletteTile = (tileName: TileName) => {
    setPaletteTile(tileName);
  }

  const handleChangeEditMode = (newMode: boolean) => {
    if (newMode && roomName !== NO_ROOM_SELECTED) {
      unsetRoom(roomName);
      unsetUnused();
    }
    setEditMode(newMode);
  }

  return (
    <Stack minWidth="100vw">
      <Grid container>
        <Grid item>
          <Paper sx={{paddingBottom: 2, bgcolor: "#FCD73F"}}>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs={8}>
                <Box style={{ maxWidth: getMaxWidth(), maxHeight: "1024px", marginTop: "15px" }}>
                  {getDisplayTiles()}
                  <Grid container justifyContent='space-evenly'>
                    <Grid item xs={6}>
                      <FormControl fullWidth style={{ marginTop: "15px", marginLeft: 20 }}>
                        <InputLabel id="size-select-label">Tile Size</InputLabel>
                        <Select
                          labelId="size-select-label"
                          id="size-select"
                          value={tileSize}
                          label="Tile Size"
                          onChange={handleSizeChange}
                        >
                          <MenuItem value={THIRTY_TWO_PX}>{THIRTY_TWO_PX}</MenuItem>
                          <MenuItem value={SIXTY_FOUR_PX}>{SIXTY_FOUR_PX}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack>
                        <Typography style={{ marginTop: 15, marginLeft: 25, boxSizing: "border-box" }}>Room</Typography>
                        <Typography border={1} style={{ marginLeft: 25, boxSizing: "border-box" }}>{roomName}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TilePalette changeTile={handleChangePaletteTile} changeEditMode={handleChangeEditMode} />
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default MapDisplay;