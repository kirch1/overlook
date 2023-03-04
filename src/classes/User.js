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
}

export {User};
