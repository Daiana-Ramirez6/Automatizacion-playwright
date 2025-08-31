import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('create-transactions', async({page})=> {

    await page.goto('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user') //localice este elemento y coloque este texto 
    await page.locator('input#password').fill('pass')
    await page.locator("//button[@type= \'submit\']").click() //realizo un click porque es un botton 
    //await page.waitForTimeout(2_000) 

    //creamos un ciclo iterativo que va a llenar el formulario muchas veces, que inluso podemos agregar código que implique que la iteracion de un numero 

    for(let i=0; i<=10; i++){   
    await page.waitForTimeout(100)
    await page.locator("//button[contains(text(),\'Añadir transacción\')]").click()
    await page.locator('id=date').fill('2023-12-31') 
    await page.locator('id=amount').fill(faker.number.int({min:100, max:200}).toString())
    await page.locator('id=description').fill(faker.person.firstName())
    //await page.waitForTimeout(1_000)

    
    await page.locator("//button[contains(text(),'Guardar')]").click()
    
    //await page.locator("//button[contains(text(),\'Guardar\')]").click()
    }
    //await page.pause()

})



//test realizado con codegen(se realiza una grabación de cada paso de la prueba y posteriormente se crea el código que se va a poder copiar y utilizar posteriormente)

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');
  //await page.getByRole('textbox', { name: 'Nombre de usuario:' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  //await page.getByRole('textbox', { name: 'Contraseña:' }).click();
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForTimeout(100) //sirve para detenerse un momento 
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.waitForTimeout(100)

  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2023-09-12');
  //await page.getByRole('textbox', { name: 'Fecha:' }).press('Enter');
  //await page.getByRole('spinbutton', { name: 'Monto:' }).click();
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('400');
  //await page.getByRole('textbox', { name: 'Descripción:' }).click();
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('foo');
  await page.getByRole('button', { name: 'Guardar' }).click();

  await page.getByRole('button', { name: 'Editar' }).click()
});