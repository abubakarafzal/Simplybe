const selectors = {
  SIGN_IN_FORM: 'form#signInForm',
  USERNAME_INPUT: 'input#username',
  PASSWORD_INPUT: 'input#password',
  REMEMBER_ME_CHECKBOX: 'input#rememberMe',
  SIGN_IN_BUTTON: 'button#signInButton',
  FORGOT_DETAILS_LINK: 'a:contains("Forgot your details?")',
  PASSWORD_OPTION: 'span.passwordOption',
  EMAIL_ERROR: '.js-validation-error__username',
  PASSWORD_ERROR: '.js-validation-error__password',
  NEW_CUSTOMER_BUTTON: 'a#newCustomerButton',
};

export class SimplyBeSignInPage {
  visit() {
    cy.log('Visiting SimplyBe homepage');
    cy.visitWithHeaders('https://www.simplybe.co.uk/');
    cy.get('body').should('contain', 'SimplyBe');
  }

  clickSignIn() {
    cy.log('Clicking Sign In button');
    cy.get('[class *="SplitHeader-module_floatingHeaderWrapper"]').should('be.visible').within(() => {
      cy.get('[data-testid="signin-test"]').should('be.visible').click();
    });
  }

  getSignInForm() {
    cy.log('Getting Sign In form');
    return cy.get(selectors.SIGN_IN_FORM);
  }

  getUsernameInput() {
    cy.log('Getting Username input');
    return cy.get(selectors.USERNAME_INPUT);
  }

  getPasswordInput() {
    cy.log('Getting Password input');
    return cy.get(selectors.PASSWORD_INPUT);
  }

  getRememberMeCheckbox() {
    cy.log('Getting Remember Me checkbox');
    return cy.get(selectors.REMEMBER_ME_CHECKBOX);
  }

  getSignInButton() {
    cy.log('Getting Sign In button');
    return cy.get(selectors.SIGN_IN_BUTTON);
  }

  getForgotDetailsLink() {
    cy.log('Getting Forgot Details link');
    return cy.get(selectors.FORGOT_DETAILS_LINK);
  }

  getPasswordOption() {
    cy.log('Getting Password option');
    return cy.get(selectors.PASSWORD_OPTION);
  }

  getEmailError() {
    cy.log('Getting Email error');
    return cy.get(selectors.EMAIL_ERROR);
  }

  getPasswordError() {
    cy.log('Getting Password error');
    return cy.get(selectors.PASSWORD_ERROR);
  }

  getNewCustomerButton() {
    cy.log('Getting New Customer button');
    return cy.get(selectors.NEW_CUSTOMER_BUTTON);
  }
}