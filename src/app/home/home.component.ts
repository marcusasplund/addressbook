import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {
  AddressService,
  Address,
  AppStore
} from '../../addresses';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';


 //-------------------------------------------------------------------
 // address-list
 //-------------------------------------------------------------------
@Component({
  selector: 'address-list',
  styles: [
    require('./home.component.css')
  ],
  template: `
  <md-list>
    <md-list-item *ngFor="let address of addresses">
      <h4 md-line>{{address.firstName}}
        {{address.lastName}}</h4>
      <p md-line>{{address.email}}</p>
      <p md-line>{{address.country}}</p>
      <button
        md-mini-fab
        class="adjusted"
        color="primary"
        (click)="selected.emit(address)">
        <md-icon class="material-icons">edit</md-icon>
      </button>
      <button
        md-mini-fab
        class="adjusted margin"
        color="accent"
        (click)="deleted.emit(address); $event.stopPropagation();">
        <md-icon class="material-icons">close</md-icon>
      </button>
    </md-list-item>
  </md-list>
  `
})
class AddressList {
  @Input() addresses: Address[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
 //-------------------------------------------------------------------
 // MAIN COMPONENT
 //-------------------------------------------------------------------
@Component({
  selector: 'home',
  providers: [],
  styles: [],
  template: `
  <md-content layout-padding>
    <md-card layout-padding>
      <md-card-content>
        <h3>Address list</h3>
        <md-input type="text" #q (keyup)="searchAll(q.value)" placeholder="Filter"></md-input>
        <address-list
          [addresses]="addresses | async"
          (selected)="selectAddress($event)"
          (deleted)="deleteAddress($event)"></address-list>
      </md-card-content>
    </md-card>
  </md-content>
  `,
  directives: [AddressList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

  selectedAddress: any;
  addresses: any;

  constructor(
      private router: Router,
      private addressService: AddressService,
      private store: Store<AppStore>
    ) {
    this.selectedAddress = store.select('selectedAddress');
    this.addresses = store.select('addresses')
      .combineLatest(store.select('visibilityFilter'), (addresses: any, visibilityFilter: any) => {
        return addresses.filter(visibilityFilter);
      });
    this.addressService.loadAddresses();
  }

  resetAddress() {
    let emptyAddress: Address = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      country: ''
    };
    this.store.dispatch({
      type: 'SELECT_ADDRESS',
      payload: emptyAddress
    });
  }

  selectAddress(address: Address) {
    this.store.dispatch({
      type: 'SELECT_ADDRESS',
      payload: address
    });
    this.router.parent.navigate(['Edit']);
  }

  deleteAddress(address: Address) {
    this.addressService.deleteAddress(address);
    this.resetAddress();
  }

  searchAll(q){
    this.store.dispatch({
      type: 'SEARCH',
      payload: q
    });
  }
}
