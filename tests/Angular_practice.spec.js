const {test, expect} = require('@playwright/test')

test.only('playwright GBL', async function({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByPlaceholder("Password").fill("Rahul@123")
    await page.getByRole("button", {name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()  // it returns either True or False
    
    // 5 seconds default timeout for expecct assertions. if it want any exceptions wrap up with {timeout: 10_000}  ---> Step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})  // it fails immediately if the text is not visible
    await page.getByRole("link", {name: 'shop'}).click()
    await page.locator("app-card").first().waitFor()
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add'}).click()

})


test('playwright test lvl time out', async function({browser}){

    test.timeout(60000) // this particular test timeout is 60 sec. means this entire test should complete within 60 sec else time out error. default it is 30 sec, now for this case exception is 60 sec

    const slow_expecct = expect.configure({timeout: 90000})  // this configuration only for this test, it holds all assertions time out for 9 sec which are in this test case

    page.setDefaultTimeout(90000); // it overrides the global level timeout for actions and follows 9 sec for this test

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByPlaceholder("Password").fill("Rahul@123")
    await page.getByRole("button", {name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()  // it returns either True or False
    
    await slow_expecct(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})  // it fails immediately if the text is not visible
    await page.getByRole("link", {name: 'shop'}).click({timeout: 10000})  // step level action timeout, waits 10 sec until it appears the button
    await page.locator("app-card").first().waitFor()
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add'}).click()

})


// import { test, expect } from '@playwright/test';

// test.only('test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/angularpractice/');
//   await page.locator('form input[name="name"]').click();
//   await page.locator('form input[name="name"]').fill('Laddu');
//   await page.locator('input[name="email"]').click();
//   await page.locator('input[name="email"]').fill('laddu@example.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('laddu@123');
//   await page.getByText('Check me out if you Love').click();
//   await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
//   await page.getByRole('radio', { name: 'Employed' }).check();
//   await page.locator('input[name="bday"]').fill('2026-11-18');
//   await page.getByRole('button', { name: 'Submit' }).click();
//   await expect(page.getByText('× Success! The Form has been')).toBeVisible();
//   await page.getByText('× Success! The Form has been').click();
//   await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
//   await page.getByRole('link', { name: 'Shop' }).click();
//   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
//   await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
//   await page.getByText('Checkout ( 2 ) (current)').click();
//   await expect(page.locator('tbody')).toContainText('iphone X');
//   await page.getByRole('link', { name: 'Nokia Edge' }).click();
//   await page.getByRole('link', { name: 'Shop' }).click();
//   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
//   await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
//   await page.getByText('Checkout ( 2 ) (current)').click();
//   await expect(page.locator('tbody')).toContainText('Nokia Edge');
//   await expect(page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).locator('#exampleInputEmail1')).toHaveValue('1');
// });