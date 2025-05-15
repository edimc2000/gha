const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  watchForFileChanges: false,
  env: {
    UI_USERNAME: process.env.UI_USERNAME,
    UI_PASSWORD: process.env.UI_PASSWORD,
  },
    viewportHeight: 1440,
  viewportWidth: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
