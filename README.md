

[![Build status](https://travis-ci.org/marcusasplund/addressbook.svg?branch=master)](https://travis-ci.org/marcusasplund/addressbook)
[![dependencies](https://david-dm.org/marcusasplund/addressbook.svg)](https://david-dm.org/marcusasplund/addressbook)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/marcusasplund/addressbook)

# [demo](https://pap.as/addressbook/)

[![Greenkeeper badge](https://badges.greenkeeper.io/marcusasplund/addressbook.svg)](https://greenkeeper.io/)

### Features
CRUD address book that use browsers `localStorage` for persistent storage.
* In "Add/Edit"-view the user can add new or edit old entries 
* Submit button is disabled for invalid entry (rules: all fields are required, email must be valid)
* In "Address List"-view, the user can filter (global search in last and first name), delete, and trigger edit of entry

### Main libs used
* Main framework [Angular2](https://angular.io/)
* UI-components [Angular2 Material](https://material.angular.io/)
* State management [ngrx-store](https://github.com/ngrx/store)
* Starter [Angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)


### ~~Known bug 2016-05-24~~

~~Affects IE11~~

~~[Inputs does not work in IE11, ng2-material bug, fixed in next release](https://github.com/angular/material2/pull/469)~~

Bug fixed 2016-05-31, inputs now works correct also in IE11

## TODO
test coverage

documentation

clean up misc starter left overs

## Dependencies
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v4.x.x`+ (or `v5.x.x`) and NPM `3.x.x`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typings` (`npm install --global typings`)
* `typescript` (`npm install --global typescript`)

## Installing

* Download and unzip, `cd addressbook`
* `npm install typings webpack-dev-server rimraf webpack -g` to install required global dependencies
* `npm install` to install all dependencies
* `typings install` to install necessary typings
* HEADS UP! If you are behind a proxy, be sure to do `typings install --proxy http://<your-proxyurl>...`
* `npm start` to start the dev server in another tab and open up http://localhost:3000/ in a browser
* HEADS UP! tested in Chrome only; ~~inputs does not work in IE11 for now, bug is fixed in angular2 material and will be updated in next release, see: [https://github.com/angular/material2/pull/469](https://github.com/angular/material2/pull/469)~~

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

## Use latest TypeScript compiler
TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

```
npm install --global typescript
```
