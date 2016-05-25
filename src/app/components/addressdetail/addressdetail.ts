import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FORM_BINDINGS, FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators, Control} from '@angular/common';
import {CountryService} from '../../../services/country-service';
import {AddressService, Address} from '../../../addresses';
import {Observable} from 'rxjs/Observable';

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
  <form novalidate (submit)="onSubmit($event)" [ngFormModel]="order">
    <md-card-content>
      <md-input
        type="text"
        [ngFormControl]="order.controls['firstName']"
        [(ngModel)]="selectedAddress.firstName"
        placeholder="First name"></md-input>
      <md-input
        type="text"
        [ngFormControl]="order.controls['lastName']"
        [(ngModel)]="selectedAddress.lastName"
        placeholder="Last name"></md-input>
      <md-input
        type="text"
        [ngFormControl]="order.controls['email']"
        [(ngModel)]="selectedAddress.email"
        placeholder="Email"></md-input>
      <select [ngFormControl]="order.controls['country']" [(ngModel)]="selectedAddress.country">
        <option *ngFor="let country of countries" [ngValue]="country">{{country}}</option>
      </select>
    </md-card-content>
    <md-card-actions>
      <button md-raised-button type="submit" (click)="cancelled.emit(selectedAddress)">Cancel</button>
      <button md-raised-button color="primary" [disabled]="!order.valid" type="submit">Save
        <md-icon class="material-icons">save</md-icon>
      </button>
    </md-card-actions>
  </form>
</md-card>
  `
})
export class AddressDetail {
  originalName: string;
  selectedAddress: Address;
  order: any;
  countries: Observable<string>;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input('address') set address(value: Address) {
    if (value) this.originalName = value.firstName + ' ' + value.lastName;
	  this.selectedAddress = Object.assign({}, value);
  }
  constructor(private fb: FormBuilder, private countryservice: CountryService) {
    this.countryservice.getAll().subscribe(res => {
      this.countries = res;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.order.valid) {
      this.saved.emit(this.selectedAddress);
    }
  }

  emailValidator(control: Control) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  ngOnInit() {
    if (!this.selectedAddress.country) {
      this.selectedAddress.country = 'Sweden';
    }
    this.order = this.fb.group({
      firstName: [this.selectedAddress.firstName || '', Validators.required],
      lastName: [this.selectedAddress.lastName || '', Validators.required],
      email: [this.selectedAddress.email || '', Validators.compose([Validators.required, this.emailValidator])],
      country: [this.selectedAddress.country || '', Validators.required]
    });
  }
}
