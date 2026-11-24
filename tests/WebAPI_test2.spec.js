const {test, expect} = require('@playwright/test')
let webcontext;

test.beforeAll(async ({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("input#userEmail").fill("agarwal@example.com")
    await page.locator("input#userPassword").fill("Rahul@123")
    await page.locator("input#login").click()
    await page.locator(".card-body b").first().waitFor()

    await context.storageState({path: 'state.json'})
    webcontext = await browser.newContext({storageState: 'state.json'})
})

test("E2E_Client Testing", async function(){
    // const context = await browser.newContext()
    // const page = await context.newPage()
    
    const page = await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    const title = await page.title()
    console.log(title)
    
    const titles = await page.locator(".card-body b").allTextContents()
    // console.log(titles)
    const card_arr = page.locator(".card-body")
    const countt = await card_arr.count()
    console.log(countt)
    for(let i=0; i<countt; i++){
        if(await card_arr.nth(i).locator("b").textContent() === "ADIDAS ORIGINAL"){
            await card_arr.nth(i).locator("text= Add To Cart").click()
            break
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind")
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const options_countt = await dropdown.locator("button").count()
    for(let i=0; i<options_countt; i++){
        const textt = await dropdown.locator("button").nth(i).textContent()
        // console.log(textt)
        if (textt === " India"){
            await dropdown.locator("button").nth(i).click()
            break
        }
    }
    // await page.pause()
    await expect(page.locator(".user__name [type='text']").first()).toHaveText("agarwal@example.com")
    await page.locator(".btnn").click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const order_id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(order_id)
    await page.locator(".btn-custom").nth(1).click()
    // const orderrow = await page.locator("tr").filter({hasText: ex_order})
    // await orderrow.getByRole('button', {name: 'View'}).click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")
    console.log(await rows.count())
    for(let i=0; i< await rows.count(); i++){
        const ids = await rows.nth(i).locator("th").textContent()
        if (order_id.includes(ids)){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }

    // await expect(page.locator(".col-text")).toHaveText(ex_order)
    await page.pause()

})


test("API test 2", async function(){
    // const context = await browser.newContext()
    // const page = await context.newPage()
    
    const page = await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    const title = await page.title()
    console.log(title)
    
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
})