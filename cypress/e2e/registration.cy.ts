import { describe } from 'mocha';
import { PageTextConstants } from '../support/constants';
import { SimplyBeSignInPage } from '../pages/SimplyBeAuthPage';
import { SimplyBeRegistrationPage } from '../pages/RegistrationPage';
const signInPage = new SimplyBeSignInPage();
const registrationPage = new SimplyBeRegistrationPage();

describe('Registration Form Tests', () => {
  beforeEach(function() {
    cy.fixture('testData').as('testData');
    signInPage.visit();
    signInPage.clickSignIn();
    signInPage.getNewCustomerButton().should('be.visible').click();
  });

  it('should allow a user to register successfully with valid inputs', function() {
    const user = this.testData.dummyUser;
    registrationPage.selectSalutation(user.salutation);
    registrationPage.typeFirstName(user.firstName);
    registrationPage.typeLastName(user.lastName);
    registrationPage.typeDay(user.day);
    registrationPage.typeMonth(user.month);
    registrationPage.typeYear(user.year);
    registrationPage.typePhoneNumber(user.phoneNumber);
    registrationPage.typeAddress(user.address);
    registrationPage.selectFirstAddressResult();
    registrationPage.typeEmail(user.email);
    registrationPage.typePassword(user.password);
    registrationPage.checkEmailOptIn();
    registrationPage.checkPostOptOut();
    registrationPage.checkPhoneOptOut();
    registrationPage.clickSubmitButton();
    cy.url().should('include', '/successful-account-registration');
  });

  it('should display errors when required fields are left empty', function() {
    registrationPage.clickSubmitButton();
    registrationPage.getFirstNameError().should('contain', PageTextConstants.emptyFirstNameMsg);
    registrationPage.getLastNameError().should('contain', PageTextConstants.emptyLastNameMsg);
    registrationPage.getDobError().should('contain', PageTextConstants.emptyDobMsg);
    registrationPage.getPhoneNumberError().should('contain', PageTextConstants.emptyPhoneNumberMsg);
    registrationPage.getEmailError().should('contain', PageTextConstants.emptyEmailMsg);
    registrationPage.getPasswordError().should('contain', PageTextConstants.emptyPasswordMsg);
  });

  it('should display an error for invalid email format', function() {
    const user = this.testData.invalidData;
    registrationPage.typeEmail(user.email);
    registrationPage.clickSubmitButton();
    registrationPage.getEmailError().should('contain', PageTextConstants.invalidEmailFormatMsg);
  });

  it('should handle edge cases for input lengths', function() {
    registrationPage.typeFirstName('J');
    registrationPage.typeLastName('3');
    registrationPage.clickSubmitButton();
    registrationPage.getFirstNameError().should('contain', PageTextConstants.invalidFirstNameMsg);
    registrationPage.getLastNameError().should('contain', PageTextConstants.invalidLastNameMsg);
  });

  it('should reject invalid date formats', function() {
    registrationPage.typeDay('32'); // Invalid day
    registrationPage.typeMonth('13'); // Invalid month
    registrationPage.typeYear('1899'); // Year too far in the past
    registrationPage.clickSubmitButton();
    registrationPage.getDobError().should('contain', PageTextConstants.dobValidationMsg);
  });
});