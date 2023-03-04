import { Booking } from "./Booking";
import { Room } from "./Room";

class User {
    constructor(userInfo) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.isEmployee = false;
        this.bookings = [];
    }

    setEmployee(val) {
      this.isEmployee = val;
    }

    setBookings(bookings, rooms) {
        this.bookings = bookings.map(booking => {
                const room = rooms.find(room => room.number === booking.roomNumber);
                return new Booking(booking, new Room(room));
            })
            .filter(booking => booking.userID === this.id)
            .sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    }

    getRoomTotal() {
        return this.bookings.reduce((acc, booking) => {
            acc += booking.room.costPerNight;
            return acc;
        },0).toFixed(2);
    }
}

export {User};
