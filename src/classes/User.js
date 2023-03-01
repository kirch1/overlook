class User {
    constructor(userInfo) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.isEmployee = false;
        this.bookings = [];
    }

    setBookings(bookings) {
        if(this.isEmployee) {
            this.bookings = bookings;
        } else {
            this.bookings = bookings.filter(booking => booking.userID === this.id);
        }
    }
}

export {User};
