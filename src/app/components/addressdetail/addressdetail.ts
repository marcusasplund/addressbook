import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FORM_BINDINGS, FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {CountryService} from '../../../services/country-service';
import {AddressService, Address} from '../../../addresses';

function emailValidator(control) {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  if (!EMAIL_REGEXP.test(control.value)) {
    return {invalidEmail: true};
  }
}

@Component({
  selector: 'address-detail',
  viewBindings: [
    FORM_BINDINGS
  ],
  directives: [
    FORM_DIRECTIVES
  ],
  providers: [
    CountryService
  ],
  template: `
  <md-card>
    <h4 md-line *ngIf="selectedAddress.id">Editing
      {{originalName}}</h4>
    <h4 md-line *ngIf="!selectedAddress.id">Create New Address</h4>
    <md-card-content>
      <form novalidate [ngFormModel]="order">
        <md-input [ngFormControl]="order.controls['firstName']" [(ngModel)]="selectedAddress.firstName" placeholder="First name"></md-input>
        <md-input [ngFormControl]="order.controls['lastName']" [(ngModel)]="selectedAddress.lastName" placeholder="Last name"></md-input>
        <md-input [ngFormControl]="order.controls['email']" [(ngModel)]="selectedAddress.email" placeholder="Email"></md-input>
        <label>Country</label>
        <select [ngFormControl]="order.controls['country']" [(ngModel)]="selectedAddress.country">
          <option *ngFor="let country of countries" value="{{country}}">{{country}}</option>
        </select>
      </form>
    </md-card-content>
    <md-card-actions>
      <button md-raised-button type="submit" (click)="cancelled.emit(selectedAddress)">Cancel</button>
      <button md-raised-button color="primary" [disabled]="!order.valid" type="submit" (click)="saved.emit(selectedAddress)">Save
        <md-icon class="material-icons">save</md-icon>
      </button>
    </md-card-actions>
  </md-card>
  `
})
export class AddressDetail {
  originalName: string;
  selectedAddress: Address;
  order: any;
  countries: Array<string>;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input('address') set address(value: Address) {
    if (value) this.originalName = value.firstName + ' ' + value.lastName;
	  this.selectedAddress = Object.assign({}, value);
  }
  constructor(private fb: FormBuilder, private countryservice: CountryService) {

  }
  
  ngOnInit() {
    this.countryservice.getAll().subscribe(res => {
      this.countries = res
    });
    this.order = this.fb.group({
      firstName: [this.selectedAddress.firstName || '', Validators.required],
      lastName: [this.selectedAddress.lastName || '', Validators.required],
      email: [this.selectedAddress.email || '', Validators.compose([emailValidator])],
      country: [this.selectedAddress.country || '', Validators.required]
    });
  }
}
