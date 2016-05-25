import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Address} from '../../../addresses';

//-------------------------------------------------------------------
// address-list
//-------------------------------------------------------------------
@Component({
  selector: 'address-list',
  template: `
<md-list>
  <md-list-item *ngFor="let address of addresses">
    <h4 md-line>{{address.name}}</h4>
    <p md-line>
      <span>{{address.description}}</span>
      <span class="demo-secondary-text">{{address.city}}</span>
    </p>
    <button md-mini-fab (click)="selected.emit(address)">
      <md-icon class="material-icons">edit</md-icon>
    </button>
    <button md-mini-fab (click)="deleted.emit(address); $event.stopPropagation();">
      <md-icon class="material-icons">close</md-icon>
    </button>
  </md-list-item>
</md-list>
  `
})
export class AddressList {
  @Input() addresses: Address[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
