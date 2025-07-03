// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Crypto } from '@peculiar/webcrypto';
if (!(global as any).crypto) {
  (global as any).crypto = new Crypto();
}
