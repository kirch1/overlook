import { Datepicker } from 'vanillajs-datepicker';
import { getData } from './api';
import { User } from './classes/User';
import { Room } from './classes/Room';
import './css/styles.css';
import 'vanillajs-datepicker/css/datepicker-bulma.css';
import './images/turing-logo.png';

// QUERY SELECTORS
const bookingsList = document.getElementById('bookings-list');
const roomsTotal = document.getElementById('rooms-total'); 
const userIcon = document.getElementById('user-icon'); 
const userName = document.getElementById('user-name'); 
const bookingsHeaderText = document.getElementById('bookings-header-text'); 
const newBookingButton = document.getElementById('new-booking-button'); 
const newBookingCancel = document.getElementById('new-booking-cancel'); 
const newBookingToolbar = document.getElementById('new-booking-toolbar');
const newBookingDate = document.getElementById('new-booking-date');
new Datepicker(newBookingDate, {autohide: true, format: 'yyyy/mm/dd'}); 

//DATA MODEL GLOBALS
let user;

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => {
    getUserData();
});

newBookingButton.addEventListener('click', () => {
    show(newBookingToolbar);
    hide(newBookingButton);
    show(newBookingCancel);
    setBookingHeader('Available Bookings');
    bookingsList.innerHTML = '<p class="notify-text">Please select a booking date.</p>'
});

newBookingCancel.addEventListener('click', () => {
    hide(newBookingToolbar);
    show(newBookingButton);
    hide(newBookingCancel);
    newBookingDate.value = '';
    Promise.all([getData('bookings'), getData('rooms')])
        .then(data => {
            updateUserHeader();
            user.setBookings(data[0].bookings, data[1].rooms);
            updateBookingsList();
        });
});

newBookingDate.addEventListener('changeDate', () => {
    console.log(newBookingDate.value)
    showAvailableRooms(newBookingDate.value);
})

bookingsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('book-button')) {
        console.log(event.target.dataset.roomnum)
    }
})

const getUserData = () => {
    Promise.all([getData('customers/12'), getData('bookings'), getData('rooms')])
        .then(data => {
            user = new User(data[0]);
            updateUserHeader();
            user.setBookings(data[1].bookings, data[2].rooms);
            updateBookingsList();
            updateRoomTotal();
        });
}

const updateUserHeader = () => {
    userIcon.innerText = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];
    userName.innerText = user.name;
    setBookingHeader(`${user.name.split(' ')[0]}'s Bookings`);
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
                <div class="room-info">
                    <label class="room-info-text">$${booking.room.costPerNight} / night</label>
                    <label class="room-info-text">${booking.date}</label>
                </div>
            </section>`
    })
}

const showAvailableRooms = (date) => {
    Promise.all([getData('bookings'), getData('rooms')])
        .then(data => {
            const alreadyBooked = data[0].bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
            const rooms = data[1].rooms.map(room => new Room(room)).filter(room => !alreadyBooked.includes(room.number))
            bookingsList.innerHTML = '';
            if(rooms) {
                rooms.forEach(room => {
                    bookingsList.innerHTML +=
                        `<section class="single-booking">
                            <div class="room-details">
                                <label class="room-title">${room.roomType} - #${String(room.number).padStart(2, '0')}</label>
                                <div class="room-tags">
                                    <label class="room-tag">bed size: ${room.bedSize}</label>
                                    <label class="room-tag">beds: ${room.numBeds}</label>
                                    <label class="room-tag">bidet: ${room.bidet ? 'yes' : 'no'}</label>
                                </div>
                            </div>
                            <div class="room-info">
                                <label class="room-info-text">$${room.costPerNight} / night</label>
                                <button class="primary-bg light-text primary-button book-button" data-roomNum="${room.number}">Book Room ${String(room.number).padStart(2, '0')}</button>
                            </div>
                        </section>`
                })
            } else {
                bookingsList.innerHTML = `<p class="notify-text">The Overlook team is very sorry, ${user.name}. No rooms match your criteria.</p>`;
            }
        });
}

const updateRoomTotal = () => {
    roomsTotal.innerText = `$${user.getRoomTotal()}`
}

const setBookingHeader = (text) => {
    bookingsHeaderText.innerHTML = text;
}

const show = (element) => {
    element.classList.remove('hidden');
}

const hide = (element) => {
    element.classList.add('hidden');
}
