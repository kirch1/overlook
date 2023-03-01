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
    getData('customers').then(data => {
        user = new User(data.customers[1]);
        updateUserHeader();
        getData('bookings').then(data => {
            user.setBookings(data.bookings);
            console.log(user.bookings)
        });
    });
}

const updateUserHeader = () => {
    userIcon.innerText = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];
    userName.innerText = user.name;
}
