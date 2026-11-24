const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail: "agarwal@example.com", userPassword: "Rahul@123"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

const fakepayloadorder = {data:[],message:"No Orders"}

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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6ae8717592a4341c4cfdf62a", 
        async route=> {
            const resp = await page.request.fetch(route.request());
            let body = JSON.stringify(fakepayloadorder);
            route.fulfill({
                response,
                body
            })
            // Intercepting the response - API response -> {Playwright fake respnse} -> browser -> render data on front end
        }
    )

    await page.locator(".btn-custom").nth(1).click()

    await page.pause();
    // const orderrow = await page.locator("tr").filter({hasText: ex_order})
    // await orderrow.getByRole('button', {name: 'View'}).click()

    
    // await page.locator("tbody").waitFor()
    // const rows = await page.locator("tbody tr")
    
})
