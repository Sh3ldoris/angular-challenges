import { computed, Injectable, signal } from '@angular/core';
import { isAddressEqual } from './assertion-function/is-address-equal.function';

export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = signal({
    name: 'Bob',
    address: {
      street: '',
      zipCode: '',
      city: '',
    },
    note: '',
    title: '',
    salary: 0,
  });

  readonly userName = computed<string>(() => this.user().name);
  readonly userAddress = computed(() => this.user().address, {
    equal: isAddressEqual,
  });

  // ...Implement the equal functions for every user section
}
