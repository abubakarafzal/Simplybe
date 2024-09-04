import { SimplyBeSignInPage } from '../pages/SimplyBeAuthPage';
import { PageTextConstants } from '../support/constants';
import { describe } from 'mocha';
import testData from '@fixtures/testData.json';
import { AddProductCartPage } from '../pages/AddProductCartPage';

const signInPage = new SimplyBeSignInPage();
const addProductCartPage = new AddProductCartPage();

describe("Simply Be Sign In Page", () => {
  beforeEach(() => {
    signInPage.visit();
    signInPage.clickSignIn();
    signInPage.getUsernameInput().type(testData.validUser.username);
    signInPage.getPasswordInput().type(testData.validUser.password);
    signInPage.getSignInButton().click();

  });

  it("should successfully submit the form with valid credentials and navigate to New In", function() {
    // Confirm that the URL is indeed the 'New In' page

    // Navigate to the 'New In' page after confirming dashboard access
    addProductCartPage.navigateToNewIn("New In");

    addProductCartPage.selectRandomProduct();
    cy.addProductToCart();
    addProductCartPage.navigateToHome();
    addProductCartPage.navigateToNewIn("New In");
    addProductCartPage.selectRandomProduct();
    cy.addProductToCart();
    addProductCartPage.navigateToHome();

    addProductCartPage.clickBagButton();
    addProductCartPage.clickCheckoutButton();
    addProductCartPage.clickContinuePaymentButton();
    addProductCartPage.clickApplyNowButton();
    addProductCartPage.clickCancelApplication();
    addProductCartPage.navigateToHome();

  });
  it("Remove all item from the bag (unseed)", () => {
    addProductCartPage.clickBagButton();
    addProductCartPage.removeAllItems();
  });
  it('should verify Product Catalogue', () => {
      // Use :first to select the first product card
    addProductCartPage.navigateToNewIn("New In");

    const firstProduct = cy.get("[class *= 'ProductCard_Root']");

      // Verify the title is present and not empty

      firstProduct
        .find("[class *= 'ProductCard_title']")
        .invoke('text')
        .should('not.be.empty');

      // Verify the price is present and matches expected format
      cy.get('[class *= \'ProductCard_price\'] p span').first()
        .invoke('text')
        .should('match', /^£\d+\.?\d*$/); // Regex to match price format like £50.00

      // Optionally check for ratings, if they exist
  });
});