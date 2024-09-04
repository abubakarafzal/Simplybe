const selectors = {
  SELECT_COLOUR: "button[data-cy='select-colour']",
  SELECT_SIZE: "button[data-cy='select-size']",
  CONTEXT_CARD_SHEET: "div[class*='ContextCardSheet'] ul[class*='Selected']",
  CONTEXT_CARD_SIZE_SHEET: "div[class*='selectSizeCard'] ul[class*='Selected']",
  VISIBLE_BUTTONS: "div[class*='ContextCardSheet'] ul[class*='Selected'] li button:enabled",
  BREADCRUMB_LINK: "breadcrumb-link",
  PRODUCT_CARD: ".productCardDiv",
  TOP_LINK: "a span",
  BAG_BUTTON: '[data-cy="bag-button"]',
  ADD_CHECKOUT_BUTTON: "GoToCheckout",
  ADD_BAG_PRODUCT: "[data-ga-tracking-id=\"addToBagButton\"]",
  ORDER_SUMMARY_VIEWPORT: "[class *= 'OrderSummary_viewPort'][class *= 'OrderSummary_viewPort'] span:nth-child(2)",
  PAYMENT_BUTTON: "#paymentButton",
  ADDED_TO_BAG_MESSAGE: "[class *= 'addedToBagMessage']",
  PRODUCT_DETAILS_CONTINUE_BUTTON: "div[class*='ProductDetails_continueButton'] button",
  START_CREDIT_APPLICATION: "a[id='startcreditapplication']",
  CANCEL_CREDIT_APPLICATION: "#cancelcreditapplication",
  CANCEL_CREDIT_APPLICATION_CONFIRM: "#cancel-credit-application-confirm",
  REMOVE_ITEM: "#remove-item",
  BRAND_LOGO: "[data-testid=\"brand-logo\"]",
  PRODUCT_DETAILS_WRAPPER: "[class*='ProductDetails_detailsWrapper']" // New selector added

};
export class AddProductCartPage {
  verifyUrl() {
    cy.log('Verifying URL');
    cy.url().should("include", "shop/p").wait(500);
  }

  selectColour() {
    cy.log('Selecting Colour');
    cy.get(selectors.PRODUCT_DETAILS_WRAPPER).should("be.visible");
    cy.scrollTo("top").wait(500);
    cy.get("body").then($body => {
      if ($body.find(selectors.SELECT_COLOUR).length > 0) {
        cy.get(selectors.SELECT_COLOUR).wait(100).scrollIntoView().should("be.visible").click();
        cy.get(selectors.CONTEXT_CARD_SHEET).should("be.visible");
        cy.get(selectors.VISIBLE_BUTTONS).filter(":visible").then($visibleColors => {
          if ($visibleColors.length === 0) {
            throw new Error("No visible colors found");
          }
          const randomIndex = Math.floor(Math.random() * $visibleColors.length);
          cy.wrap($visibleColors[randomIndex]).click();
        });
      } else {
        cy.log("The attribute data-cy=\"select-colour\" was not found, skipping color selection");
      }
    });
  }

  selectSize() {
    cy.log('Selecting Size');
    cy.get(selectors.PRODUCT_DETAILS_WRAPPER).should("be.visible");
    cy.scrollTo("top").wait(2000);
    cy.get("body").then($body => {
      if ($body.find(selectors.SELECT_SIZE).length > 0) {
        cy.get(selectors.SELECT_SIZE).should("be.visible").wait(100).click();
        cy.get(selectors.CONTEXT_CARD_SIZE_SHEET).should("be.visible").wait(200);
        cy.get(selectors.VISIBLE_BUTTONS).filter(":visible").then($visibleSizes => {
          if ($visibleSizes.length === 0) {
            throw new Error("No visible sizes found");
          }
          const randomIndex = Math.floor(Math.random() * $visibleSizes.length);
          cy.wrap($visibleSizes[randomIndex]).wait(100).click();
        });
      } else {
        cy.log("The attribute data-cy=\"select-size\" was not found, skipping size selection");
      }
    });
  }

  clickBreadcrumbLink() {
    cy.log('Clicking Breadcrumb Link');
    cy.getBySel(selectors.BREADCRUMB_LINK).invoke("attr", "href").then(href => {
      cy.log("Extracted Breadcrumb Link:", href);
      cy.getBySel(selectors.BREADCRUMB_LINK).wait(500).scrollIntoView().click();
      cy.url().should("contain", href);
    });
  }

  selectRandomProduct() {
    cy.log('Selecting Random Product');
    cy.get(selectors.PRODUCT_CARD).should("be.visible").its("length").then((length) => {
      const randomIndex = Math.floor(Math.random() * length);
      cy.get(selectors.PRODUCT_CARD).eq(randomIndex).click();
    });
  }

  navigateToNewIn(link: any) {
    cy.log('Navigating to New In');
    cy.contains(selectors.TOP_LINK, link, { matchCase: false }).should("exist").wait(100).click({ force: true });
    cy.url().should("include", "/shop/c/");
  }

  navigateToHome() {
    cy.log('Navigating to Home');
    cy.get(selectors.BRAND_LOGO).filter(":visible").first().should("be.visible").click({ force: true });
    const baseUrl = Cypress.config("baseUrl");
    cy.url().should("include", baseUrl);
  }

  interceptAndWaitForBag() {
    cy.log('Intercepting and Waiting for Bag');
    cy.intercept("GET", "**api/shop/bag*", (req) => {
      console.log("Request intercepted:", req);
    }).as("getBag");

    cy.wait("@getBag").then((interception) => {
      assert.equal(interception.response.statusCode, 200, "Verify status code is 200 OK");
    });
  }

  clickBagButton() {
    cy.log('Clicking Bag Button');
    cy.wait(100);
    cy.get(selectors.BAG_BUTTON).should("be.visible").click();
    this.interceptAndWaitForBag();
  }

  clickCheckoutButton() {
    cy.log('Clicking Checkout Button');
    cy.getBySel(selectors.ADD_CHECKOUT_BUTTON).filter(":visible").first().should("be.visible").click({ force: true });
  }

  clickContinuePaymentButton() {
    cy.log('Clicking Continue Payment Button');
    cy.get(selectors.ORDER_SUMMARY_VIEWPORT).invoke("text")
      .should("not.be.empty")
      .and("match", /^£\d{1,3}(,\d{3})*(\.\d{2})?$/);
    cy.clickVisibleFirst(selectors.PAYMENT_BUTTON);
  }

  clickAddBagProduct() {
    cy.log('Clicking Add Bag Product');
    cy.get(selectors.ADD_BAG_PRODUCT).should("be.visible").click();
    cy.contains(selectors.ADDED_TO_BAG_MESSAGE, "Added to bag", { matchCase: false }).should("be.visible");
    cy.get(selectors.PRODUCT_DETAILS_CONTINUE_BUTTON).should("be.visible").click();
  }

  clickApplyNowButton() {
    cy.log('Clicking Apply Now Button');
    cy.clickVisibleFirst(selectors.START_CREDIT_APPLICATION);
  }

  clickCancelApplication() {
    cy.log('Clicking Cancel Application');
    cy.get(selectors.CANCEL_CREDIT_APPLICATION).should("be.visible").click();
    cy.get(selectors.CANCEL_CREDIT_APPLICATION_CONFIRM).should("be.visible").click();
  }

  removeAllItems() {
    cy.log('Removing All Items');
    cy.pause();
    cy.get('body').then($body => {
      if ($body.find(selectors.REMOVE_ITEM).length > 0) {
        cy.get(selectors.REMOVE_ITEM).each(($btn) => {
          cy.wrap($btn).click();
          cy.wait(100);
        });

        cy.wait(200);
        this.removeAllItems();
      }
    });
  }
}