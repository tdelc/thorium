import uuid from 'uuid';

export class Deck {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = 'Deck';
    this.simulatorId = params.simulatorId || null;
    this.number = params.number || 1;
    this.svgPath = params.svgPath || '';
    this.doors = params.doors || false;
    this.evac = params.evac || false;
    this.hallway = params.hallway || '';
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  setDoors(doors) {
    this.doors = doors;
  }
  setEvac(evac) {
    this.evac = evac;
  }
  updateHallwaySvg(hallway) {
    this.hallway = hallway;
  }
}


export class Room {
  constructor(params) {
    if (!params.deckId) return false;
    this.class = 'Room';
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.deckId = params.deckId;
    this.name = params.name || 'Vic\'s Lounge';
    this.gas = params.gas || false;
    this.svgPath = params.svgPath || '';
  }
  setGas(gas) {
    this.gas = gas;
  }
  rename(name) {
    this.name = name;
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
}

export class InventoryItem {
  constructor(params) {
    this.class = 'Inventory';
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || 'Generic Cargo';
    this.roomCount = params.roomCount || {};
    this.metadata = params.metadata || {};
  }
  move(fromRoom, toRoom, count) {
    if (this.roomCount[fromRoom] >= count) {
      this.roomCount[fromRoom] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  updateCount(room, count) {
    this.roomCount[room] = Math.max(0, count);
  }
}