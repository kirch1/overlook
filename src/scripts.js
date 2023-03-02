import { getData } from './api';
import { User } from './classes/User';
import './css/styles.css';
import './images/turing-logo.png';


// QUERY SELECTORS
const bookingsList = document.getElementById('bookings-list');
const roomsTotal = document.getElementById('rooms-total'); 
const userIcon = document.getElementById('user-icon'); 
const userName = document.getElementById('user-name'); 

//DATA MODEL GLOBALS
let user;

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => {
    getUserData();
});

const getUserData = () => {
    Promise.all([getData('customers/1'), getData('bookings'), getData('rooms')])
        .then(data => {
            user = new User(data[0]);
            updateUserHeader();
            user.setBookings(data[1].bookings, data[2].rooms);
            updateBookingsList();
        });
}

const updateUserHeader = () => {
    userIcon.innerText = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];
    userName.innerText = user.name;
}

const updateBookingsList = () => {
    bookingsList.innerHTML = '';
    user.bookings.forEach(booking => {
        bookingsList.innerHTML +=
            `<section class="single-booking">
                <div class="room-details">
                    <label class="room-title">${booking.room.roomType} - #${String(booking.room.number).padStart(2, '0')}</label>
                    <div class="room-tags">
                        <label class="room-tag">bed size: ${booking.room.bedSize}</label>
                        <label class="room-tag">beds: ${booking.room.numBeds}</label>
                        <label class="room-tag">bidet: ${booking.room.bidet ? 'yes' : 'no'}</label>
                    </div>
                </div>
                <label class="room-price">$${booking.room.costPerNight} / night</label>
            </section>`
    })
}
