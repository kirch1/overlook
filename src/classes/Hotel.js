import { Booking } from "./Booking";
import { Room } from "./Room";
import { User } from "./User";

class Hotel {
  constructor(users, rooms, bookings) {
    this.users = users.map(user => new User(user));
    this.currentUser = null;
    this.rooms = rooms.map(room => new Room(room));
    this.bookings;
    this.setBookings(bookings);
  }

  authenticate(username, password) {
    if(username === 'manager') {
      return 'manager';
    }else {
      const id = username.replace('customer', '');
      const availableUsers = this.users.map(user => user.id.toString());
      if(username.includes('customer') && availableUsers.includes(id) && password === 'overlook2021') {
        return id;
      }else {
        return 'invalid';
      }
    }
  }

  setUser(user) {
    if(user === 'manager') {
      this.currentUser = new User({id: 0, name: 'Manager'});
    }else {
      this.currentUser = new User(user);
    }
  }

  getCustomerName(id) {
    return this.users.find(user => user.id === id).name
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
    bookingsOutput = bookingsOutput.filter(booking => booking.userID === this.currentUser.id);

    if(sortDesc) {
      bookingsOutput = bookingsOutput.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    }
    return bookingsOutput;
  }

  getAvailableRooms(date) {
    const alreadyBooked = this.bookings.filter(booking => booking.date === date).map(booking => booking.room.number);
    return this.rooms.filter(room => !alreadyBooked.includes(room.number));
  }

  getRoomTotal() {
    return this.getBookings().reduce((acc, booking) => acc += booking.room.costPerNight, 0).toFixed(2);
  }

  getStatsForDate(date) {
    const todaysBookings = this.bookings.filter(booking => booking.date === date);
    return {
      revenue: todaysBookings.reduce((acc, booking) => acc += booking.room.costPerNight, 0).toFixed(2),
      roomsAvailable: this.getAvailableRooms(date).length,
      roomsBooked: this.rooms.length - this.getAvailableRooms(date).length
    }
  }
}

export {Hotel};
