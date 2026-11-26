import { Address } from '../user.service';

export function isAddressEqual(a1: Address, a2: Address): boolean {
  if (a1 === a2) return true;
  return !(
    a1.city !== a2.city ||
    a1.street !== a2.street ||
    a1.zipCode !== a2.zipCode
  );
}
