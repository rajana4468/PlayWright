const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail: "agarwal@example.com", userPassword: "Rahul@123"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

const {APIUtils} = require('./Utils/APIUtils')


let response

test.beforeAll(async ()=>{
    const apicontext = await request.newContext()
    
    const apiutils = new APIUtils(apicontext, loginPayload)
    response = await apiutils.createOrder(orderPayload);

})

test("E2E_Client Testing", async function({browser}){


    const context = await browser.newContext()
    const page = await context.newPage()

    await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.locator(".btn-custom").nth(1).click()
    // const orderrow = await page.locator("tr").filter({hasText: ex_order})
    // await orderrow.getByRole('button', {name: 'View'}).click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")
    console.log(await rows.count())
    console.log(await response.OrderId);
    const res_Oid = response.OrderId;

    const orderrow = page.locator("tbody tr").filter({hasText: res_Oid});

    await orderrow.getByRole('button', {name: 'View'}).first().click();
    // for(let i=0; i< await rows.count(); i++){
    //     const ids = await rows.nth(i).locator("th").textContent()
    //     if (res_Oid === ids){
    //         await rows.nth(i).locator("button").first().click()
    //         break
    //     }
    // }
    // await expect(page.locator(".col-text")).toHaveText(ex_order)
    await page.pause()

})
