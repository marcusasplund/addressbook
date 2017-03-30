import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export interface AppStore {
  addresses: Address[];
  selectedAddress: Address;
}

export const addresses = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_ADDRESSS':
      return payload;
    case 'CREATE_ADDRESS':
      return [...state, payload];
    case 'UPDATE_ADDRESS':
      return state.map(address => {
        return address.id === payload.id ? Object.assign({}, address, payload) : address;
      });
    case 'DELETE_ADDRESS':
      return state.filter(address => {
        return address.id !== payload.id;
      });
    default:
      return state;
  }
};

export const selectedAddress = (state: any = undefined, {type, payload}) => {
  switch (type) {
    case 'SELECT_ADDRESS':
      return payload;
    default:
      return state;
  }
};

export const SEARCH = 'SEARCH';

export const visibilityFilter = (state = (address) => true, {type, payload}) => {
  switch (type) {
    case SEARCH:
      // search performed on first and last name. Can be extended
      return (address) => address.firstName.indexOf(payload) !== -1 ||
        address.lastName.indexOf(payload) !== -1;
    default:
      return state;
  }
};

@Injectable()
export class AddressService {
  addresses: Observable<Array<Address>>;

  constructor(private store: Store<AppStore>) {

  }

  getAllLocalAddresses() {
    let storedAddressBook = localStorage.getItem('ng2addressBook') || '[]';
    return JSON.parse(storedAddressBook);
  }

  setAllLocalAddresses(payload) {
    localStorage.setItem('ng2addressBook', JSON.stringify(payload));
    console.log(this.getAllLocalAddresses());
  }

  createSingleLocalAddress(payload) {
    let addresses = this.getAllLocalAddresses();
    addresses.push(payload);
    this.setAllLocalAddresses(addresses);
    return this.getAllLocalAddresses();
  }

  filterWithout(addresses, id) {
    id = id.toString();
    return addresses.filter(function(obj) {
      return id.indexOf(obj.id) === -1;
    });
  }

  deleteSingleLocalAddress(id) {
    let addresses = this.getAllLocalAddresses();
    addresses = this.filterWithout(addresses, id);
    this.setAllLocalAddresses(addresses);
    return this.getAllLocalAddresses();
  }
  updateSingleLocalAddress(payload) {
    let addresses = this.getAllLocalAddresses();
    addresses = this.filterWithout(addresses, payload.id);
    addresses.push(payload);
    this.setAllLocalAddresses(addresses);
    return this.getAllLocalAddresses();
  }

  loadAddresses() {
    let payload = this.getAllLocalAddresses();
    this.store.dispatch({ type: 'ADD_ADDRESSS', payload });
  }

  saveAddress(address: Address) {
    (address.id) ? this.updateAddress(address) : this.createAddress(address);
  }

  createAddress(address: Address) {
    let newAddress = this.addUUID(address);
    let payload = this.createSingleLocalAddress(newAddress);
    this.store.dispatch({ type: 'CREATE_ADDRESS', payload: address });
  }

  updateAddress(address: Address) {
    this.updateSingleLocalAddress(address);
    this.store.dispatch({ type: 'UPDATE_ADDRESS', payload: address });
  }

  deleteAddress(address: Address) {
    this.deleteSingleLocalAddress(address.id);
    this.store.dispatch({ type: 'DELETE_ADDRESS', payload: address });
  }
  // Utility functions to simulate server generated IDs
  private addUUID(address: Address): Address {
    return Object.assign({}, address, {id: this.generateUUID()}); // Avoiding state mutation FTW!
  }

  private generateUUID(): string {
    return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/1|0/g, function() {
        return (0 | Math.random() * 16).toString(16);
      });
  };
}
