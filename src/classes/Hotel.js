import { Booking } from "./Booking";
import { Room } from "./Room";
import { User } from "./User";

class Hotel {
  constructor(user, rooms, bookings) {
    this.currentUser = new User(user);
    this.rooms = rooms.map(room => new Room(room));
    this.bookings;
    this.setBookings(bookings);
  }

  setUser(user) {
    this.currentUser = new User(user);
  }

  setRooms(rooms) {
    this.rooms = rooms.map(room => new Room(room));
  }

  setBookings(bookings) {
    this.bookings = bookings.map(booking => {
      const bookingRoom = this.rooms.find(room => room.number === booking.roomNumber);
      return new Booking(booking, bookingRoom);
    });
  }

  getBookings(userFilter = true, sortDesc = true) {
    let bookingsOutput = this.bookings;
    if(userFilter){
      bookingsOutput = bookingsOutput.filter(booking => booking.userID === this.currentUser.id);
    }
    if(sortDesc) {
      bookingsOutput = bookingsOutput.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    }
    return bookingsOutput;
  }

  getAvailableRooms(date) {
    const alreadyBookedNums = this.bookings.filter(booking => booking.date === date).map(booking => booking.room.number);
    return this.rooms.filter(room => !alreadyBookedNums.includes(room.number));
  }
}

export {Hotel};
