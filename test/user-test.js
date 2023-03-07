import { assert } from 'chai';
import { User } from '../src/classes/User';
import { customers } from './testData/customer-data';

describe('User Tests', () => {
  it('Should exist and import', () => {
    assert.isFunction(User);
  });

  it('Should contain id and name', () => {
    const user = new User(customers[0]);
    assert.equal(user.id, 1);
    assert.equal(user.name, 'Leatha Ullrich');
  });

});
