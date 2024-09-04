const selectors = {
  SALUTATION_SELECT: '#salutation',
  FIRST_NAME_INPUT: '#firstName',
  LAST_NAME_INPUT: '#lastName',
  DAY_INPUT: '#day',
  MONTH_INPUT: '#month',
  YEAR_INPUT: '#year',
  PHONE_NUMBER_INPUT: '#phoneNumber',
  ADDRESS_INPUT: '#address',
  ADDRESS_RESULT: '.addressFinder__result',
  EMAIL_INPUT: '#email',
  PASSWORD_INPUT: '#password',
  EMAIL_OPT_IN_CHECKBOX: '#emailOptIn',
  POST_OPT_OUT_CHECKBOX: '#postOptOut',
  PHONE_OPT_OUT_CHECKBOX: '#phoneOptOut',
  SUBMIT_BUTTON: 'button[type="submit"]',
  FIRST_NAME_ERROR: '.js-validation-error__firstName',
  LAST_NAME_ERROR: '.js-validation-error__lastName',
  DOB_ERROR: '.js-validation-error__dob',
  PHONE_NUMBER_ERROR: '.js-validation-error__phoneNumber',
  EMAIL_ERROR: '.js-validation-error__email',
  PASSWORD_ERROR: '.js-validation-error__password'
};

export class SimplyBeRegistrationPage {
  selectSalutation(salutation: string) {
    cy.log(`Selecting salutation: ${salutation}`);
    cy.get(selectors.SALUTATION_SELECT).select(salutation);
  }

  typeFirstName(firstName: string) {
    cy.log(`Typing first name: ${firstName}`);
    cy.get(selectors.FIRST_NAME_INPUT).type(firstName);
  }

  typeLastName(lastName: string) {
    cy.log(`Typing last name: ${lastName}`);
    cy.get(selectors.LAST_NAME_INPUT).type(lastName);
  }

  typeDay(day: string) {
    cy.log(`Typing day: ${day}`);
    cy.get(selectors.DAY_INPUT).type(day);
  }

  typeMonth(month: string) {
    cy.log(`Typing month: ${month}`);
    cy.get(selectors.MONTH_INPUT).type(month);
  }

  typeYear(year: string) {
    cy.log(`Typing year: ${year}`);
    cy.get(selectors.YEAR_INPUT).type(year);
  }

  typePhoneNumber(phoneNumber: string) {
    cy.log(`Typing phone number: ${phoneNumber}`);
    cy.get(selectors.PHONE_NUMBER_INPUT).type(phoneNumber);
  }

  typeAddress(address: string) {
    cy.log(`Typing address: ${address}`);
    cy.get(selectors.ADDRESS_INPUT).type(address);
  }

  selectFirstAddressResult() {
    cy.log('Selecting first address result');
    cy.get(selectors.ADDRESS_RESULT).first().should('be.visible').click();
  }

  typeEmail(email: string) {
    cy.log(`Typing email: ${email}`);
    cy.get(selectors.EMAIL_INPUT).type(email);
  }

  typePassword(password: string) {
    cy.log(`Typing password: ${password}`);
    cy.get(selectors.PASSWORD_INPUT).type(password);
  }

  checkEmailOptIn() {
    cy.log('Checking email opt-in');
    cy.get(selectors.EMAIL_OPT_IN_CHECKBOX).check();
  }

  checkPostOptOut() {
    cy.log('Checking post opt-out');
    cy.get(selectors.POST_OPT_OUT_CHECKBOX).check();
  }

  checkPhoneOptOut() {
    cy.log('Checking phone opt-out');
    cy.get(selectors.PHONE_OPT_OUT_CHECKBOX).check();
  }

  clickSubmitButton() {
    cy.log('Clicking submit button');
    cy.contains(selectors.SUBMIT_BUTTON, 'Continue').click();
  }

  getFirstNameError() {
    cy.log('Getting first name error');
    return cy.get(selectors.FIRST_NAME_ERROR);
  }

  getLastNameError() {
    cy.log('Getting last name error');
    return cy.get(selectors.LAST_NAME_ERROR);
  }

  getDobError() {
    cy.log('Getting date of birth error');
    return cy.get(selectors.DOB_ERROR);
  }

  getPhoneNumberError() {
    cy.log('Getting phone number error');
    return cy.get(selectors.PHONE_NUMBER_ERROR);
  }

  getEmailError() {
    cy.log('Getting email error');
    return cy.get(selectors.EMAIL_ERROR);
  }

  getPasswordError() {
    cy.log('Getting password error');
    return cy.get(selectors.PASSWORD_ERROR);
  }
}