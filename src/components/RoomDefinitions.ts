export type Room = {
  id: number,
  name: string,
  tiles: Array<number>
}

export const MAX_ROWS = 10;
export const MAX_COLUMNS = 16;

export const calculateTile = (row: number, column: number) => {
  return row * MAX_COLUMNS + column;
}

const ct = calculateTile;
const Entry: Room = {id: 1, name: "Entry", tiles: [ct(0, 7)]};
const TrapRoom: Room = {id: 2, name: "Trap Room", tiles: [ct(1, 1), ct(1, 2), ct(1, 3), ct(2, 1), ct(2, 2), ct(2, 3), ct(3, 1), ct(3, 2), ct(3, 3)]};
const EntryWay: Room = {id: 3, name: "Entry Way", tiles: [ct(1, 6), ct(1, 7), ct(1, 8), ct(2, 6), ct(2, 7), ct(2, 8), ct(3, 6), ct(3, 7), ct(3, 8)]};
const Armory: Room = {id: 4, name: "Armory", tiles: [ct(4, 0), ct(4, 1), ct(4, 2), ct(4, 3), ct(5, 0), ct(5, 1), ct(5, 2), ct(5, 3), ct(6, 0), ct(6, 1), ct(6, 2), ct(6, 3), ct(7, 0), ct(7, 1), ct(7, 2), ct(7, 3)]};
const Lair: Room = {id: 5, name: "Lair", tiles: [ct(4, 4), ct(4, 5), ct(4, 6), ct(4, 7), ct(4, 8), ct(4, 9), ct(4, 10), ct(5, 4), ct(5, 5), ct(5, 6), ct(5, 7), ct(5, 8), ct(5, 9), ct(5, 10), ct(6, 4), ct(6, 5), ct(6, 6), ct(6, 7), ct(6, 8), ct(6, 9), ct(6, 10), ct(7, 4), ct(7, 5), ct(7, 6), ct(7, 7), ct(7, 8), ct(7, 9), ct(7, 10), ct(8, 4), ct(8, 5), ct(8, 6), ct(8, 7), ct(8, 8), ct(8, 9), ct(8, 10) ]}
const EmptyHall: Room = {id: 6, name: "Empty Hall", tiles: [ct(2, 9), ct(2, 10), ct(2, 11), ct(2, 12), ct(2, 13), ct(2, 14)]}

export const Rooms: Array<Room> = [Entry, TrapRoom, EntryWay, Armory, Lair, EmptyHall];

export const getRoomName = (index: number): string => {
  let roomName = '';
  for (let i = 0; i < Rooms.length; i++) {
    const room = Rooms[i];
    if (room.tiles.includes(index)) {
      roomName = room.name;
      break;
    }
  }
  return roomName;
}

export const getRoomById = (id: number) => {
  let room;
  for (let i = 0; i < Rooms.length; i++) {
    if (id === Rooms[i].id) {
      room = Rooms[i];
    }
  }
  return room;
}

export const getRoomTiles = (name: string): Array<number> => {
  for (let i=0; i < Rooms.length; i++) {
    const room = Rooms[i];
    if (room.name === name) {
      return room.tiles;
    }
  }
  return [];
}

export const getUnusedTileIndexes = () => {
  const limit = MAX_ROWS * MAX_COLUMNS;
  const fullArray = [...Array(limit).keys()];
  const result = [...Entry.tiles, ...TrapRoom.tiles, ...EntryWay.tiles, ...Armory.tiles, ...Lair.tiles, ...EmptyHall.tiles]
  .filter((set => // store the set and return the actual callback
      o => set.has(o) ? false : set.add(o)
    )(new Set()) // use an IIFE to create a Set and store it set
  );
  let difference = fullArray.filter(x => !result.includes(x));
  return difference;
}