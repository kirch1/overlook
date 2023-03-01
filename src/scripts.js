import { getData } from './api';
import './css/styles.css';
import './images/turing-logo.png';


// QUERY SELECTORS
const bookingsList = document.getElementById('bookings-list');
const roomsTotal = document.getElementById('rooms-total'); 
const userName = document.getElementById('user-name'); 

//DATA MODEL GLOBALS
let user;

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => {
    getData('customers').then(data => {
        user = data.customers[0];
        updateUserInfo();
    });
});

const updateUserInfo = () => {
    userName.innerText = user.name;
}
