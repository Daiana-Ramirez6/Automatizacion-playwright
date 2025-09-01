import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('buying new products', async({page})=> {
await page.goto('http://127.0.0.1:5500')
//vamos a buscar el producto por el nombre 
//spath

//para darle varias veces click al botón
for(let i=0; i<=5;i++){
    await page.locator("//h5[contains(., 'producto 1')]/ancestor::div[contains(@class, 'card-body')]//button").click()
}
await page.locator("//h5[contains(., 'producto 2')]/ancestor::div[contains(@class, 'card-body')]//button").click()
await page.locator("//h5[contains(., 'producto 3')]/ancestor::div[contains(@class, 'card-body')]//button").click()

//csc selecctor
//con el numeral encuentra el id
await page.locator("button#view-cart-btn").click()

//guardo en variables las cantidades de cada producto
const product1Quantity= await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 1')]/ancestor::tr//td[3]").textContent()
const product2Quantity= await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 2')]/ancestor::tr//td[3]").textContent()
const product3Quantity= await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 3')]/ancestor::tr//td[3]").textContent()

//comparo
expect(product1Quantity).toEqual('6')
expect(product1Quantity).toEqual('1')
expect(product1Quantity).toEqual('2')

//37 falta hacer tarea
await page.locator("id=checkout-btn").click()

await page.locator("id=name").fill(faker.person.firstName())
await page.locator("id=email").fill(faker.internet.email())
await page.locator("id=address").fill(faker.location.streetAddress())
//lo sigueinte no es buena practica pero mejora problemas de tiempo

await page.waitForTimeout(2000)//2segundos

await page.locator("//a[@href='#paymentInfo']").click()

await page.locator("id=card-number").fill(faker.finance.creditCardNumber())
await page.locator("id=card-expiry").fill('12-2027')

await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())
await page.locator("id=place-order-btn").click()

//verificar que este localizador sea visible

await expect(page.locator("//h4[contains(., 'Tu compra fue exitosa')]")).toBeVisible()
})
//revisar como usa la funcionalidad de playwright de localizar elementos 