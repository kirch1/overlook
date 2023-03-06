import { Datepicker } from 'vanillajs-datepicker';
import SlimSelect from 'slim-select'
import { addBooking, getData } from './api';
import { Hotel } from './classes/Hotel';
import 'slim-select/dist/slimselect.css';
import 'vanillajs-datepicker/css/datepicker.css';
import './css/styles.css';
import './images/turing-logo.png';

// QUERY SELECTORS
const mainSection = document.getElementById('main-section');
const bookingsList = document.getElementById('bookings-list');
const roomsTotal = document.getElementById('rooms-total'); 
const statsCustomer = document.getElementById('stats-customer'); 
const statsManager = document.getElementById('stats-manager'); 
const customerSelection = document.getElementById('customer-select'); 
const userName = document.getElementById('user-name'); 
const userInfo = document.getElementById('user-info'); 
const bookingsHeaderText = document.getElementById('bookings-header-text'); 
const loginSection = document.getElementById('login');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button'); 
const userLogin = document.getElementById('username');
const userPass = document.getElementById('password');
const newBookingButton = document.getElementById('new-booking-button'); 
const newBookingCancel = document.getElementById('new-booking-cancel'); 
const newBookingToolbar = document.getElementById('new-booking-toolbar');
const newBookingDate = document.getElementById('new-booking-date');

// DATEPICKER AND SLIM SELECT
const datepicker = new Datepicker(newBookingDate, {
    autohide: true, 
    format: 'yyyy/mm/dd', 
    startView: null
  });
const slimselect = new SlimSelect({
    select: '#type-filter',
    settings: { placeholderText: 'Room Type', showSearch: false, allowDeselect: true},
    events: { afterChange: () => typeFilterSelected() }
});

document.documentElement.style.setProperty('--ss-primary-color', '#38618C');
document.querySelector('.ss-list').ariaLabel = "Select room type filter";

//GLOBALS
let hotel, ssCustomers, manageUserID;
let manager = false;

//EVENT LISTENERS
window.addEventListener('load', () => {
  setupHotel();
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();  
  const attempt = hotel.authenticate(userLogin.value, userPass.value);

  if(attempt === 'invalid') {
    invalidCredentials();
  }else if(attempt === 'manager') {
    managerLogin();
  }else {
    sucessfulLogin(attempt);
  }
});

newBookingButton.addEventListener('click', () => {
  clearFilters();
  show(newBookingToolbar);
  hide(newBookingButton);
  show(newBookingCancel);
  setBookingHeader('Available Rooms');
});

newBookingCancel.addEventListener('click', () => {
  showBookingsView();
});

newBookingDate.addEventListener('changeDate', () => {
  if(datepicker.getDate('yyyy/mm/dd')) {
    slimselect.enable();
    showAvailableRooms(datepicker.getDate('yyyy/mm/dd'), slimselect.getSelected());
  }else {
    clearFilters();
  }
})

bookingsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('book-button')) {
        const room = parseInt(event.target.dataset.roomnum);
        addBooking(hotel.currentUser.id, datepicker.getDate('yyyy/mm/dd'), room).then(() => {
            showBookingsView();
        });
    }
})

logoutButton.addEventListener('click', () => {
  hide(mainSection);
  hide(userInfo);
  show(loginSection);
  hotel = null;
});

const setupHotel = () => {
  Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
    .then(data => {
        hotel = new Hotel(data[0].customers, data[1].rooms, data[2].bookings);
        managerLogin();
        //sucessfulLogin(22);
    });
}

const managerLogin = () => {
  manager = true;
  hotel.setUser('manager');
  newBookingButton.disabled = true;
  hide(loginSection);
  populateCustomerSearch();
  show(statsManager);
  show(customerSelection);
  hide(statsCustomer);
  showMain();
}

const sucessfulLogin = (id) => {
  getData('customers/' + id)
    .then(data => {
        hotel.setUser(data);
        showBookingsList();
        updateRoomTotal();
        hide(statsManager);
        show(statsCustomer);
        showMain();
    });
}

const showMain = () => {
  userLogin.value = '';
  userPass.value = '';
  hide(loginSection);
  updateUserHeader();
  show(mainSection);
  show(userInfo);
}

const invalidCredentials = () => {
  username.classList.add('input-error');
  password.classList.add('input-error');
  setTimeout(() => {
    username.classList.remove('input-error');
    password.classList.remove('input-error');
  }, 600);
}

const typeFilterSelected = () => {
  if(datepicker.getDate('yyyy/mm/dd')){
    showAvailableRooms(datepicker.getDate('yyyy/mm/dd'), slimselect.getSelected())
  } else {
    clearFilters();
  }
}

const updateUserHeader = () => {
  userName.innerText = hotel.currentUser.name;
}

const showBookingsView = () => {
  Promise.all([getData('rooms'), getData('bookings')])
    .then(data => {
        hotel.setRooms(data[0].rooms);
        hotel.setBookings(data[1].bookings);
        hide(newBookingToolbar);
        show(newBookingButton);
        hide(newBookingCancel);
        showBookingsList();
        updateRoomTotal();
    });
}

const showBookingsList = () => {
  if(manager && manageUserID){
    setBookingHeader(`Manage ${hotel.getCustomerName(manageUserID).split(' ')[0]}'s Bookings`);
  }else {
    setBookingHeader(`${hotel.currentUser.name.split(' ')[0]}'s Bookings`);
  }
  bookingsList.innerHTML = '';
  hotel.getBookings().forEach(booking => {
    bookingsList.innerHTML +=
      `<section class="single-booking">
        <div class="room-details">
          <h3 class="room-title">${booking.room.roomType} - #${String(booking.room.number).padStart(2, '0')}</h3>
          <div class="room-tags">
            <p class="room-tag">bed size: ${booking.room.bedSize}</p>
            <p class="room-tag">beds: ${booking.room.numBeds}</p>
            <p class="room-tag">bidet: ${booking.room.bidet ? 'yes' : 'no'}</p>
          </div>
        </div>
        <div class="room-info">
          <p class="room-info-text">$${booking.room.costPerNight} / night</p>
          <p class="room-info-text">${booking.date}</p>
        </div>
      </section>`
  });
}

const showAvailableRooms = (date, types) => {
  Promise.all([getData('rooms'), getData('bookings')])
    .then(data => {
      hotel.setRooms(data[0].rooms);
      hotel.setBookings(data[1].bookings);
      let rooms = hotel.getAvailableRooms(date);
      if(types.length) {
        rooms = rooms.filter(room => types.includes(room.roomType));
      }
      bookingsList.innerHTML = '';
      if(rooms.length) {
        rooms.forEach(room => {
          bookingsList.innerHTML +=
            `<section class="single-booking">
              <div class="room-details">
                <h3 class="room-title">${room.roomType} - #${String(room.number).padStart(2, '0')}</h3>
                <div class="room-tags">
                  <p class="room-tag">bed size: ${room.bedSize}</p>
                  <p class="room-tag">beds: ${room.numBeds}</p>
                  <p class="room-tag">bidet: ${room.bidet ? 'yes' : 'no'}</p>
                </div>
              </div>
              <div class="room-info">
                <p class="room-info-text">$${room.costPerNight} / night</p>
                <button class="primary-bg light-text primary-button book-button" data-roomNum="${room.number}">Book Room ${String(room.number).padStart(2, '0')}</button>
              </div>
            </section>`
        })
      }else {
        bookingsList.innerHTML = `<p class="notify-text">The Overlook team is very sorry, ${hotel.currentUser.name.split(' ')[0]}.<br>No rooms match your criteria.</p>`;
      }
    });
}

const managerCustomerSelected = () => {
  newBookingButton.disabled = false;
  manageUserID = ssCustomers.getSelected()[0];
  hotel.currentUser.setUserID(manageUserID);
  showBookingsView();
}

const updateRoomTotal = () => {
  roomsTotal.innerText = `$${hotel.getRoomTotal()}`
}

const setBookingHeader = (text) => {
  bookingsHeaderText.innerHTML = text;
}

const clearFilters = () => {
  datepicker.setDate({clear: true});
  slimselect.disable();
  slimselect.setSelected([]);
  bookingsList.innerHTML = '<p class="notify-text">Please select a booking date.</p>';
}

const populateCustomerSearch = () => {
  ssCustomers = new SlimSelect({
    select: '#customer-search-select',
    settings: { placeholderText: 'Select Customer'},
    events: { afterChange: managerCustomerSelected },
    data: hotel.users.map(user => ({text: user.name, value: user.id}))
  });
}

const show = (element) => {
  element.classList.remove('hidden');
}

const hide = (element) => {
  element.classList.add('hidden');
}
