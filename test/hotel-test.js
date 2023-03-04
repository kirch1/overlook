import { assert } from 'chai';
import { User } from '../src/classes/User';
import { Hotel } from '../src/classes/Hotel';
import { Room } from '../src/classes/Room';
import { Booking } from '../src/classes/Booking';
import { bookings } from './testData/booking-data';
import { customers } from './testData/customer-data';
import { rooms } from './testData/rooms-data';

describe('Hotel Tests', () => {
  const hotel = new Hotel(customers[8], rooms, bookings);

  it('Should exist and import', () => {
    assert.isFunction(Hotel);
  });

  it('Should contain a current User instance', () => {
    assert.instanceOf(hotel.currentUser, User);
    assert.equal(hotel.currentUser.id, 9);
  });

  it('Should contain all rooms array as Rooms object', () => {
    assert.instanceOf(hotel.rooms[24], Room);
    assert.equal(hotel.rooms[24].bidet, true);
  });

  it('Should contain all bookings as Booking instances', () => {
    assert.instanceOf(hotel.bookings[2], Booking);
    assert.equal(hotel.bookings[2].date, '2022/01/10');
  });

  it('Should be able to get all bookings for a user', () => {
    const bookingsArray = [new Booking(bookings[0], new Room(rooms[14]))]
    assert.deepEqual(hotel.getBookings(), bookingsArray);
  });

  it('Should be able to get array of available Rooms given a date', () => {
    const roomsArray = [new Room(rooms[0]), new Room(rooms[2]), new Room(rooms[3]), new Room(rooms[5]),
                        new Room(rooms[9]), new Room(rooms[10]), new Room(rooms[15]), new Room(rooms[17]),
                        
                        new Room(rooms[20]), new Room(rooms[21]), new Room(rooms[22]), new Room(rooms[24])]
    assert.deepEqual(hotel.getAvailableRooms('2022/01/10'), roomsArray);
  });
});
