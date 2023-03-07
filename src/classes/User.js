import { Booking } from "./Booking";
import { Room } from "./Room";

class User {
    constructor(userInfo) {
        this.id = userInfo.id;
        this.name = userInfo.name;
    }
    setUserID(id) {
      this.id = id;
    }
}

export {User};
