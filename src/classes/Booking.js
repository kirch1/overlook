import { Room } from "./Room";

class Booking {
    constructor(bookingInfo, room) {
        this.id = bookingInfo.id;
        this.userID = bookingInfo.userID;
        this.date = bookingInfo.date;
        this.room = new Room(room);
    }
}

export {Booking};
