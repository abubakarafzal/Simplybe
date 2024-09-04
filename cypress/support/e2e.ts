import './commands';
import Chainable = Cypress.Chainable;
declare const cy: Chainable<any>;

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test
  return false;
});


// Hide fetch/XHR requests from command log
if (Cypress.env('hideXHRInCommandLog')) {
  const app = window.top;

  if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');

    app.document.head.appendChild(style);
  }
}
