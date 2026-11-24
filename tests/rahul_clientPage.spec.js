const{test, expect} = require('@playwright/test')
const { PassThrough } = require('node:stream')
const { text } = require('node:stream/consumers')

// test('reg_login', async function({browser}){
//     const context = await browser.newContext()
//     const page = await context.newPage()
//     await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
//     await page.locator(".btn1").click()
//     await page.locator("[type='firstName']").fill("pandeyh1")
//     await page.locator("[type='lastName']").fill("babber")
//     await page.locator("[type='email']").fill("pandeyh1@gmail.com")
//     await page.locator("[type='text']").fill("7418529631")
//     // await page.locator("[value='Male']").check()
//     await expect(page.locator("[value='Male']").isChecked())
//     await page.locator("input#userPassword").fill("Babber@1234")
//     await page.locator("input#confirmPassword").fill("Babber@1234")
//     await page.locator("[type='checkbox']").check()
//     await page.locator("[formcontrolname='occupation']").selectOption("Engineer")
//     await page.locator("input#login").click()
//     const tit = await page.locator(".headcolor").textContent()
//     await console.log(tit);
//     await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
//     await page.locator("input#userEmail").fill("pandeyh1@gmail.com")
//     await page.locator("input#userPassword").fill("Babber@1234")
//     await page.locator("input#login").click()
//     const title = await page.title()
//     await console.log(title)
//     const textt = await page.locator(".card-body b").nth(0).textContent()
//     await console.log(textt);
// })

test("E2E_Client Testing", async function({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("input#userEmail").fill("agarwal@example.com")
    await page.locator("input#userPassword").fill("Rahul@123")
    await page.locator("input#login").click()
    const title = await page.title()
    console.log(title)
    await page.locator(".card-body b").first().waitFor()
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
    const ex_order = "6aef0d9392a4341c4c093a2f"
    // const orderrow = await page.locator("tr").filter({hasText: ex_order})
    // await orderrow.getByRole('button', {name: 'View'}).click()
    const rows = await page.locator("tbody tr")
    console.log(await rows.count())
    for(let i=0; i< await rows.count(); i++){
        const ids = await rows.nth(i).locator("th").textContent()
        if (ids === ex_order){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }

    // await expect(page.locator(".col-text")).toHaveText(ex_order)
    await page.pause()

})