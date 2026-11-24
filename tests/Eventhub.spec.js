const {test, expect} = require('@playwright/test')

test('Event Assess', async function({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("input#email").fill("agarwal@example.com")
    await page.locator("input#password").fill("Rahul@123")
    await page.locator("button#login-btn").click()
    await page.getByRole("button", {name: 'Admin'}).click()
    await page.getByRole("navigation").getByRole("link",{name: 'Manage Events'}).click()
    await page.locator("input#event-title-input").fill("Mass Music Contest")
    await page.locator("[placeholder='Describe the event…']").fill("Description about Event in Detail, YOu might not be able to see because you are not me")
    await page.locator("#category").selectOption("Concert")
    await page.locator("#city").fill("Hyderabad")
    await page.locator("#venue").fill("Mahadevpura, Near flyover, 560048")
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-11-12T18:00');
    await page.locator("[placeholder='0.00']").fill('19')
    await page.locator("#total-seats").fill("100")
    await page.locator("[placeholder$='https://…']").fill("https://infotopbio.com/2025/03/05/prabhas/")
    await page.locator("[type$='submit']").click()
    await page.locator("#nav-home").click()

    const events = page.locator("#event-card")
    const countt = await events.count()
    for(let i=0; i<countt; i++){
        const titlee = await events.nth(i).locator("a .font-semibold").textContent()
        if (titlee == "Mass Music Contest"){
            await events.nth(i).locator("#book-now-btn").click()
            await page.locator("#customerName").fill("Yaswanth")
            await page.locator("#customer-email").fill("yaswanth@example.com")
            await page.locator("#phone").fill("7894651238")
            await page.locator("#confirm-booking").click()
            await expect(page.locator(".text-xl")).toHaveText("Booking Confirmed! 🎉")
            await page.locator("#nav-home").click()
            break
        }
    }
    await page.pause()
})