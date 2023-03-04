import {assert} from 'chai';
import { Room } from '../src/classes/Room';
import { rooms } from './testData/rooms-data';

describe('Room Tests', () => {
  it('Should exist and import', () => {
    assert.isFunction(Room)
  });

  it('Should contain room and type', () => {
    const room = new Room(rooms[0])
    assert.equal(room.number, 1);
    assert.equal(room.roomType, "residential suite");
  });

  it('Should contain bidet boolean, bed size, bumber of beds',() => {
    const room = new Room(rooms[1])
    assert.equal(room.bidet, false);
    assert.equal(room.bedSize, 'full');
    assert.equal(room.numBeds, 2);
  });

  it('Should contain cost per night', () => {
    const room = new Room(rooms[2])
    assert.equal(room.costPerNight, 491.14);
  });
});
