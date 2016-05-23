import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { Edit } from './edit.component';

describe('Edit', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Edit
  ]);

  it('should log ngOnInit', inject([ Edit ], (edit) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    edit.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
