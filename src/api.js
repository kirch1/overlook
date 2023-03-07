const getData = (type) => {
    return fetch('http://localhost:3001/api/v1/' + type)
            .then(response => {
                if(!response.ok){
                    throw new Error(response);
                }
                return response.json();
            }).catch(error => console.log(error))
}

const addBooking = (userID, date, room) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
                method: 'POST',
                body: JSON.stringify({userID: userID, date: date, roomNumber: room}), 
                headers: { 'Content-Type': 'application/json'}
            }).then(response => {
                if(!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }).catch(error => console.log(error))
}

const deleteBooking = (bookingID) => {
    return fetch('http://localhost:3001/api/v1/bookings/' + bookingID, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            }).then(response => {
                if(!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }).catch(error => console.log(error))
}

export {getData, addBooking, deleteBooking};
