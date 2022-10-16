const {
  defineConfig
} = require("cypress");

module.exports = defineConfig({
  projectId: "9tvt9x",
  defaultCommandTimeout: 5000,
  viewportWidth: 1536,
  viewportHeight: 960,
  e2e: {
    defaultCommandTimeout: 10000
  },
  env: {
    automation_url: "http://automationpractice.com"
  },
  retries: {
    runMode: 1,
    openMode: 1
  }
})