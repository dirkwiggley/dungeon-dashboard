import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { MAX_COLUMNS, MAX_ROWS, Room, Rooms, RoomEditor } from './RoomEditor';
import TilePalette from './TilePalette';
import { TileName, NewTiles } from './NewTiles';
import { Tiles32 } from './Tiles32';
import { Tiles64 } from './Tiles64';

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
const TEN_TWENTY_FOUR_PX = "1024px";
const FIVE_TWELVE_PX = "512px";
const TWO_FIFTY_SIX_PX = "256px";

function MapDisplay() {
  const [mapMaxHeight, setMapMaxHeight] = useState<string>(FIVE_TWELVE_PX);
  const [mapMaxWidth, setMapMaxWidth] = useState<string>(TWO_FIFTY_SIX_PX);
  const [roomName, setRoomName] = useState<string>('');
  const [tileSize, setTileSize] = useState<string>(THIRTY_TWO_PX as string);
  const [columns, setColumns] = useState<number>(MAX_COLUMNS + 1);
  const [toggleable, setToggleable] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [paletteTile, setPaletteTile] = useState<TileName>("Solid");
  const [roomEditor, setRoomEditor] = useState<RoomEditor>();
  const [newTiles, setNewTiles] = useState<Array<NewTiles>>();
  const [selectNewRoomTiles, setSelectNewRoomTiles] = useState<boolean>(false);
  const [newRoomTiles, setNewRoomTiles] = useState<Array<NewTiles>>();

  useEffect(() => {
    let rd = new RoomEditor(Rooms);
    setRoomEditor(rd);
  }, []);

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
    const roomTileIndexes = roomEditor!.getRoomTiles(selectedRoomName);
    const firstRoomTileIndex = roomTileIndexes[0];
    if (dungeonMap && dungeonMap[firstRoomTileIndex] && dungeonMap[firstRoomTileIndex].includes(HIGHLIGHT)) {
      toggleDungeonTiles(roomTileIndexes);
    }
  }

  const unsetAll = () => {
    let tiles = new Array<number>();
    for (let i = 0; i < dungeonMap.length; i++) {
      const tileName = dungeonMap[i];
      if (tileName.includes(HIGHLIGHT)) {
        tiles.push(i)        ;
      }
    }
    toggleDungeonTiles(tiles);
  }

  const unsetUnused = () => {
    const unusedIndexes = roomEditor!.getUnusedTileIndexes();
    unusedIndexes.forEach(index => {
      if (dungeonMap[index].includes(HIGHLIGHT)) {
        dungeonMap[index] = findNewTileName(index);
      }
    });
    updateDisplay();
  }

  const toggleDungeonTile = (index: number) => {
    dungeonMap[index] = findNewTileName(index);
    updateDisplay();
  }

  const toggleDungeonTiles = (tileIndexes: Array<number>) => {
    for (let index = 0; index < tileIndexes.length; index++) {
      const currentTileIndex = tileIndexes[index];
      dungeonMap[currentTileIndex] = findNewTileName(currentTileIndex);
    }
    updateDisplay();
  }

  const updateDisplay = () => {
    setToggleable(!toggleable);
  }

  const tileClick = (index: number) => {
    if (editMode) {
      unsetOtherRooms('');
      // update the newTiles array
      if (newTiles) {
        const newTile = {index: index, tileName: paletteTile, oldTileName: dungeonMap[index]};
        let replacementTiles = [...newTiles];
        let addTile = true;
        for (let i = 0; i < newTiles.length; i++) {
          let tile = replacementTiles[i];
          if (tile.index === index) {
            replacementTiles[i] = newTile;
            addTile = false;
            break;
          }
        }
        if (addTile) {
          replacementTiles.push(newTile);
        }
        setNewTiles(replacementTiles);
      }
      // update the acutal map
      dungeonMap[index] = paletteTile + HIGHLIGHT as TileName;
      updateDisplay();
    } else {
      // Set the room name display
      let selectedRoomName = roomEditor!.getRoomName(index);
      if (selectedRoomName === '') {
        selectedRoomName = NO_ROOM_SELECTED;
        toggleDungeonTile(index);
      } else {
        const roomTileIndexes = roomEditor!.getRoomTiles(selectedRoomName);
        toggleDungeonTiles(roomTileIndexes);
      }
      // unselect other rooms
      unsetOtherRooms(selectedRoomName);
      setRoomName(selectedRoomName);
    }
  }

  const getMaxWidth = () => {
    if (tileSize === THIRTY_TWO_PX) {
      return 32 * columns - 15;
    } else {
      return 64 * (columns + 3) - 12;
    }
  }

  const getDisplayTiles = () => {
    const returnArray = [];
    for (let index = 0; index < dungeonMap.length; index++) {
      const tileName = dungeonMap[index];
      const data = getTileManager().getTileData(tileName);
      let newBit = (
        <Grid item wrap="nowrap" key={index} xs={1} style={{ maxWidth: tileSize, maxHeight: tileSize }}>
          <Button onClick={() => tileClick(index)} style={{ minWidth: tileSize, maxWidth: tileSize, minHeight: tileSize, maxHeight: tileSize }}>
            {<img src={data} />}
          </Button>
        </Grid>);
      returnArray.push(newBit);
    };
    return (
      <Grid container
        spacing={0}
        sx={{
          marginLeft: "15px",
          columns: { columns },
          overflowY: "scroll",
          overflowX: "scroll",
          maxHeight: mapMaxHeight,
          maxWidth: getMaxWidth()
        }}>
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
      setNewTiles(new Array<NewTiles>());
      setNewRoomTiles(new Array<NewTiles>());
    }
    setEditMode(newMode);
  }

  const handleCommit = () => {
    if (editMode) {
      if (newTiles) {
        newTiles.forEach(tile => {
          dungeonMap[tile.index] = tile.tileName;
        });
      }
      setNewTiles(new Array<NewTiles>());
      unsetOtherRooms('');
      updateDisplay();
    }
  }

  const handleSelectRoomTiles = (newMode: boolean) => {
    setSelectNewRoomTiles(newMode);
  }

  const handleCancel = () => {
    unsetOtherRooms('');
    unsetAll();
    newTiles?.forEach(tile => {
      dungeonMap[tile.index] = tile.oldTileName;
    })
  }

  return (
    <Stack minWidth="100vw">
      <Grid container sx={{paddingLeft: "15px", minWidth: "100%", maxWidth: "100%"}}>
        <Grid item>
          <Paper sx={{ paddingBottom: 2, bgcolor: "#FFD530", minWidth: "100%", maxWidth: "100%" }}>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs={8}>
                <Box style={{ minWidth: "100%", maxWidth: "100%", maxHeight: TEN_TWENTY_FOUR_PX, marginTop: "15px" }}>
                  {getDisplayTiles()}
                  <Grid container justifyContent='space-evenly'>
                    <Grid item xs={3}>
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
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                      <Stack>
                        <Typography style={{ marginTop: 15, marginLeft: 25, boxSizing: "border-box" }}>Room</Typography>
                        <Typography border={1} style={{ marginLeft: 25, boxSizing: "border-box" }}>{roomName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TilePalette 
                  changeTile={handleChangePaletteTile} 
                  changeEditMode={handleChangeEditMode} 
                  handleCommit={handleCommit}
                  handleCancel={handleCancel} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default MapDisplay;