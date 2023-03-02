import { Booking } from "./Booking";

class User {
    constructor(userInfo) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.isEmployee = false;
        this.bookings = [];
    }

    setBookings(bookings, rooms) {
        this.bookings = bookings.filter(booking => booking.userID === this.id).map(booking => {
            const room = rooms.find(room => room.number === booking.roomNumber);
            return new Booking(booking, room);
        });
    }
}

export {User};
