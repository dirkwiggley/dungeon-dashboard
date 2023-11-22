import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Tooltip, Typography } from '@mui/material';
import { MAX_COLUMNS, MAX_ROWS, Room, Rooms, RoomEditor } from './RoomEditor';
import TilePalette, { SELECT, EDIT, BUILD_ROOM, EditorModes } from './TilePalette';
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
  const [editorMode, setEditMode] = useState<EditorModes>(SELECT);
  const [paletteTile, setPaletteTile] = useState<TileName>("Solid");
  const [roomEditor, setRoomEditor] = useState<RoomEditor>();
  const [newTiles, setNewTiles] = useState<Array<NewTiles>>();

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

  const getOtherHighlitRoomTiles = (selectedRoomName: string) => {
    let tiles = new Array<number>();
    const rooms = roomEditor!.getRooms();
    for (let i = 0; i < rooms.length; i++) {
      const currentRoomName = roomEditor!.getRoomName(i);
      if (currentRoomName !== selectedRoomName) {
        const roomTileIndexes = roomEditor!?.getRoomTiles(currentRoomName);
        const firstRoomTileIndex = roomTileIndexes[0];
        if (dungeonMap[firstRoomTileIndex].includes(HIGHLIGHT)) {
          tiles.push(...roomTileIndexes);
        }
      }
    }
    return tiles;
  }

  const unsetOtherRooms = (selectedRoomName: string) => {
    const indexes: Array<number> = getOtherHighlitRoomTiles(selectedRoomName);
    if (indexes.length > 0) {
      toggleDungeonTiles(indexes!);
    }
  }

  const unsetUnusedTiles = (selectedRoomName: string) => {
    const roomIndexes: Array<number> = getOtherHighlitRoomTiles(selectedRoomName);
    const allIndexes: Array<number> = Array.from(Array(dungeonMap.length).keys());
    allIndexes.forEach(index => {
      const tileIsHighlight = dungeonMap[index].includes(HIGHLIGHT);
      if (!roomIndexes.includes(index) && tileIsHighlight) {
        toggleDungeonTile(index);
      }
    });
  }

  const unsetAll = () => {
    let tiles = new Array<number>();
    for (let i = 0; i < dungeonMap.length; i++) {
      const tileName = dungeonMap[i];
      if (tileName.includes(HIGHLIGHT)) {
        tiles.push(i);
      }
    }
    toggleDungeonTiles(tiles);
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
    switch (editorMode) {
      case SELECT:
        // Set the room name display
        let selectedRoomName = roomEditor!.getRoomNameByTileIndex(index);
        if (selectedRoomName === '') {
          selectedRoomName = NO_ROOM_SELECTED;
          unsetUnusedTiles(selectedRoomName);
          toggleDungeonTile(index);
        } else {
          unsetUnusedTiles(selectedRoomName);
          const roomTileIndexes = roomEditor!.getRoomTiles(selectedRoomName);
          toggleDungeonTiles(roomTileIndexes);
        }
        unsetOtherRooms(selectedRoomName);
        setRoomName(selectedRoomName);
        break;
      case EDIT:
        // update the newTiles array
        if (newTiles) {
          const newTile = { index: index, tileName: paletteTile, oldTileName: dungeonMap[index] };
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
        break;
      case BUILD_ROOM:
        // update the newTiles array
        if (newTiles) {
          let replacementTiles = [...newTiles];
          let removeTile = false;
          replacementTiles.forEach(tile => {
            if (tile.index === index) {
              removeTile = true;
            }
          });
          if (removeTile) {
            replacementTiles = newTiles.filter(tile => {
              return tile.index !== index;
            });
          } else {
            const newTile = { index: index, tileName: dungeonMap[index], oldTileName: dungeonMap[index] };
            replacementTiles.push(newTile);
          }
          setNewTiles(replacementTiles);
        }
        // update the acutal map
        toggleDungeonTile(index);
        updateDisplay();
        break;
      default:
        break;
    }
  }

  const getMaxWidthPx = () => {
    if (tileSize === THIRTY_TWO_PX) {
      return (32 * (columns - 1)).toString()+"px";
    } else {
      return (64 * (columns - 1)).toString()+"px";
    }
  }

  const getRoomNameByTileIndex = (index: number): string => {
    const name = roomEditor?.getRoomNameByTileIndex(index);
    return name ? name : "";
  }

  const getDisplayTiles = () => {
    const returnArray = [];
    const mc = MAX_COLUMNS;
    const mr = MAX_ROWS;
    let index = 0;
    for (let rowCounter = 0; rowCounter < mr; rowCounter++) {
      let tempArray = [];
      console.log(`Starting row ${rowCounter}`);
      for (let columnCounter = 0; columnCounter < mc; columnCounter++) {
        const tileName = dungeonMap[index];
        const data = getTileManager().getTileData(tileName);
        console.log(`Inserting tile ${index}, ${tileName}`);
        // In the button the index was being updated by the incrementer below so this is necessary
        const currentIndex = index;
        const newBit = (
          <Box key={`${rowCounter.toString()}_${columnCounter.toString()}`} style={{ maxWidth: tileSize, maxHeight: tileSize }}>
            <Tooltip title={getRoomNameByTileIndex(index)}>
              <Button onClick={() => tileClick(currentIndex)} style={{ minWidth: tileSize, maxWidth: tileSize, minHeight: tileSize, maxHeight: tileSize }}>
                {<img src={data} />}
              </Button>
            </Tooltip>
          </Box>
        );
        index += 1;
        tempArray.push(newBit);
      }
      returnArray.push(<Box key={`row_${rowCounter.toString()}`} sx={{ display: "flex" }}>{tempArray}</Box>);
    }
    return (
      <Box border={1} sx={{minWidth: getMaxWidthPx(), maxWidth: getMaxWidthPx(), marginLeft: 2}}>
        {returnArray}
      </Box>
    );
  }

  const handleSizeChange = (event: { target: { value: any; }; }) => {
    setTileSize(event.target.value);
  }

  const handleChangePaletteTile = (tileName: TileName) => {
    setPaletteTile(tileName);
  }

  const handleChangeEditMode = (newMode: EditorModes) => {
    switch (newMode) {
      case SELECT:
        unsetAll();
        break;
      case EDIT:
        setNewTiles(new Array<NewTiles>());
        unsetAll();
        break;
      case BUILD_ROOM:
        setNewTiles(new Array<NewTiles>());
        unsetAll();
        break;
    }
    setEditMode(newMode);
  }

  const handleCommit = (roomName: string = "") => {
    if (editorMode === EDIT && newTiles) {
      newTiles.forEach(tile => {
        dungeonMap[tile.index] = tile.tileName;
      });
    } else if (editorMode === BUILD_ROOM && newTiles) {
      const newId: number = roomEditor!.getNextId();
      const tileIndexes = new Array<number>();
      newTiles.forEach(tile => {
        tileIndexes.push(tile.index);
      })
      const newRoom: Room = { id: newId, name: roomName, tiles: tileIndexes };
      roomEditor!.addRoom(newRoom);
    }
    setNewTiles(new Array<NewTiles>());
    unsetAll();
    updateDisplay();
  }

  const handleCancel = () => {
    unsetOtherRooms('');
    unsetAll();
    setEditMode(SELECT);
    setNewTiles(new Array<NewTiles>());
    newTiles?.forEach(tile => {
      dungeonMap[tile.index] = tile.oldTileName;
    });
  }

  return (
    <Stack minWidth="100vw">
      <Grid container sx={{ paddingLeft: "15px", minWidth: "100%", maxWidth: "100%" }}>
        <Grid item>
          <Paper sx={{ paddingBottom: 2, bgcolor: "#FFD530", minWidth: "100%", maxWidth: "100%" }}>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item>
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
                          color="secondary"
                        >
                          <MenuItem value={THIRTY_TWO_PX}>{THIRTY_TWO_PX}</MenuItem>
                          <MenuItem value={SIXTY_FOUR_PX}>{SIXTY_FOUR_PX}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                      <Stack>
                        <Box border={1} style={{ marginTop: 10, marginLeft: 15 }}>
                          <Typography style={{ marginTop: 5, marginLeft: 5, boxSizing: "border-box" }}>Room</Typography>
                          <Typography style={{ marginLeft: 5, marginBottom: 5, boxSizing: "border-box" }}>{roomName}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
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