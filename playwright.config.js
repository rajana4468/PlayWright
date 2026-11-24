// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30*1000,
  expect: {
    timeout: 10000  // globally setting up assertions timeout for 10 seconds
  },

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    browserName: 'chromium',
    // screenshot: 'on',  ---> this will gicve you screenshots for all steps 
    trace: 'on'  //---> this will give you detail execution before and after step. If you want this only on failed cases "retain-on-failure" use this as value
    
  }
});