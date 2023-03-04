import {assert} from 'chai';
import { Booking } from '../src/classes/Booking';
import { Room } from '../src/classes/Room';
import { bookings } from './testData/booking-data';
import { rooms } from './testData/rooms-data';

describe('Room Tests', () => {
  it('Should exist and import', () => {
    assert.isFunction(Booking);
  });

  it('Should contain id and userid', () => {
    const booking = new Booking(bookings[0]);
    assert.equal(booking.id, '5fwrgu4i7k55hl6sz');
    assert.equal(booking.userID, 9);
  });

  it('Should contain booking date', () => {
    const booking = new Booking(bookings[4]);
    assert.equal(booking.date, '2022/02/05');
  });

  it('Should accept a Room instance', () => {
    const room = new Room(rooms[13]);
    const booking = new Booking(bookings[5], room);
    assert.instanceOf(booking.room, Room);
  });

});
