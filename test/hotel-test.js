import { assert } from 'chai';
import { User } from '../src/classes/User';
import { bookings } from './testData/booking-data';
import { customers } from './testData/customer-data';
import { rooms } from './testData/rooms-data';

describe('Hotel Tests', () => {
  it('Should exist and import', () => {
    assert.isFunction(User);
  });

  it('Should contain id and name', () => {
    const user = new User(customers[0]);
    assert.equal(user.id, 1);
    assert.equal(user.name, 'Leatha Ullrich');
  });

  it('Should be able to flag user as hotel employee', () => {
    const user = new User(customers[0]);
    user.setEmployee(true);
    assert.equal(user.isEmployee, true);
  });

});
