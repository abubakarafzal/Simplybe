//* App Main Custom Commands
import { AddProductCartPage } from '../pages/AddProductCartPage';

const addProductCartPage = new AddProductCartPage();

const navigateToSignup = () => {
  cy.log('Navigating to signup');
  cy.get('[data-testid="myAccountIcon"]').trigger('mouseover');
  cy.get('[data-testid="signup-link"]').should('be.visible').click();
};

const visitWithHeaders = (headers = {}) => {
  const baseURL = Cypress.config('baseUrl');
  cy.log('Visiting with headers', headers);

  cy.visit(baseURL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Referer': baseURL,
      'Origin': baseURL,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      ...headers
    },
    failOnStatusCode: false
  });

  cy.wait(1000);

  cy.get('body').then(($body) => {
    if ($body.find('#onetrust-accept-btn-handler').length > 0) {
      cy.log('Clicking cookie consent button');
      cy.get('#onetrust-accept-btn-handler').click();
    }
  });

  if (Cypress.browser.isHeadless) {
    cy.log('Running in headless mode');
    // Add any additional steps needed for headless mode here
  }
};

const getBySel = (selector: any, ...args: any[]) => {
  cy.log(`Getting element by selector: ${selector}`);
  return cy.get(`[data-cy="${selector}"]`, ...args);
};

const clickVisibleFirst = (selector: any) => {
  cy.log(`Clicking first visible element by selector: ${selector}`);
  cy.get(selector).filter(':visible').first().should('be.visible').click({ force: true });
};

const addProductToCart = () => {
  cy.log('Adding product to cart');
  addProductCartPage.verifyUrl();
  addProductCartPage.selectColour();
  addProductCartPage.selectSize();
  addProductCartPage.clickAddBagProduct();
  addProductCartPage.clickBreadcrumbLink();
};

// * Add all Parent Commands
Cypress.Commands.addAll(
  { prevSubject: false },
  { getBySel, clickVisibleFirst, addProductToCart, visitWithHeaders, navigateToSignup }
);