/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    visitWithHeaders(headers?: any): Chainable<any>;
    addProductToCart(): Chainable<any>;
    getBySel(selector: any, ...args: any[]): Chainable<any>;
    clickVisibleFirst(selector: any): Chainable<any>;
    navigateToSignup(): Chainable<any>;
  }
}
