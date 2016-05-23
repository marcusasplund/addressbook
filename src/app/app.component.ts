/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { Home } from './home';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
  <md-content>
    <md-toolbar color="primary">
        <span>{{ name }}</span>
        <span class="fill"></span>
        <button md-button router-active [routerLink]=" ['Address list'] ">
          Address list
        </button>
        <button md-button router-active [routerLink]=" ['Edit'] ">
          Add/Edit
        </button>
    </md-toolbar>
    <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>
    <router-outlet></router-outlet>
    <footer>
      <a md-button [href]="url">by: @marcusasplund</a>
    </footer>
    </md-content>
  `
})
@RouteConfig([
  { path: '/', name: 'Address list', component: Home, useAsDefault: true },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/edit', name: 'Edit', loader: () => require('es6-promise!./edit')('Edit') }
])
export class App {
  loading = false;
  name = 'ng2 Address book';
  url = 'https://pap.as/'

  constructor() {}

}
