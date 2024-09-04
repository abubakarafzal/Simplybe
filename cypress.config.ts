import { defineConfig } from 'cypress';
import * as fs from 'fs';

export default defineConfig({
  numTestsKeptInMemory: 0,
  watchForFileChanges: true,
  viewportWidth: 1600,
  viewportHeight: 1024,
  pageLoadTimeout: 100000,
  defaultCommandTimeout: 30000,
  retries: {
    runMode: 0,
    openMode: 0
  },
  video: true, // Enable video recording
  screenshotOnRunFailure: true, // Enable screenshots on test failure

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: 'https://www.simplybe.co.uk/',
    chromeWebSecurity: false,
    experimentalMemoryManagement: false,
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    env: { hideXHRInCommandLog: true },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});