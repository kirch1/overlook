import { Room } from "./Room";

class Booking {
    constructor(bookingInfo, room) {
        this.id = bookingInfo.id;
        this.date = bookingInfo.date;
        this.room = new Room(room);
    }
}

export {Booking};
