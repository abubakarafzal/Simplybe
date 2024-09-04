import { SimplyBeSignInPage } from '../pages/SimplyBeAuthPage';
import { PageTextConstants } from '../support/constants';
import { describe } from 'mocha';
import testData from '@fixtures/testData.json';
import { SimplyBeRegistrationPage } from '../pages/RegistrationPage';

const signInPage = new SimplyBeSignInPage();
const registrationPage = new SimplyBeRegistrationPage();

describe('Simply Be Sign In Page', () => {
  beforeEach(() => {
    signInPage.visit();
    signInPage.clickSignIn();
  });

  it('should display the sign-in form with all required elements', () => {
    signInPage.getSignInForm().should('be.visible');
    signInPage.getUsernameInput().should('be.visible');
    signInPage.getPasswordInput().should('be.visible');
    signInPage.getRememberMeCheckbox().should('be.visible');
    signInPage.getSignInButton().should('be.visible');
    signInPage.getForgotDetailsLink().should('be.visible');
  });

  it('should toggle password visibility when the show/hide icon is clicked', () => {
    signInPage.getPasswordInput().should('have.attr', 'type', 'password');
    signInPage.getPasswordOption().click();
    signInPage.getPasswordInput().should('have.attr', 'type', 'text');
    signInPage.getPasswordOption().click();
    signInPage.getPasswordInput().should('have.attr', 'type', 'password');
  });

  it('should show an error message if the email field is empty on form submission', function() {
    signInPage.getPasswordInput().type(testData.invalidUser.password);
    signInPage.getSignInButton().click();
    signInPage.getEmailError().should('contain', 'Enter a valid email address or account number');
  });

  it('should show an error message if the password field is empty on form submission', function() {
    signInPage.getUsernameInput().type(testData.validUser.username);
    signInPage.getSignInButton().click();
    signInPage.getPasswordError().should('contain', PageTextConstants.signInPasswordValidationMsg);
  });

  it('should successfully submit the form with valid credentials', function() {
    signInPage.getUsernameInput().type(testData.validUser.username);
    signInPage.getPasswordInput().type(testData.validUser.password);
    signInPage.getSignInButton().click();
    cy.url({ timeout: 1000 }).should('include', '/dashboard');
  });

  it.skip('should redirect to the registration page when "I\'m a new customer" is clicked', () => {
    signInPage.getNewCustomerButton().click();
    cy.url().should('include', '/registration');
  });
});


