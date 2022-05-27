import { Address, Terminal } from '../types';

export const getAddressString = (address: Address) => {
  return `${address.addressLine1}, ${address.addressLine2 + ', ' ?? ''}${address.city}, ${
    address.postalCode
  }`;
};

export const getTerminalString = (terminal: Terminal) => {
  return `${terminal.name}, ${getAddressString(terminal.address)}`;
};
