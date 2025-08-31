import {test, expect} from '@playwright/test'

test('login', async({page})=> {

    await page.goto('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user') //localice este elemento y coloque este texto 
    await page.locator('input#password').fill('pass')
    await page.locator("//button[@type= \'submit\']").click() //realizo un click porque es un botton 
    
    await page.waitForTimeout(900)
    await page.locator("//button[contains(text(),\'Añadir transacción\')]").click()


    await page.locator('id=date').fill('2023-12-31')
    await page.locator('id=amount').fill('500')
    await page.locator('id=description').fill('Description Testing')
    await page.locator('//button[contains(text(),\'Guardar\')]').click()


    
    //agregamos asserciones 
    //creo una constante donde voy a almacenar el texto que voy a extraer de donde se encuentra este xpath, esto permite almacenar un valor como string cualquier valor 
     const actualDate= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent() //de ese localizador deme el contenido, el texto que tiene 
     const actualAmount= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
     const actualDescription= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()

     //ahora si hacemos una aserción 
     expect(actualDate).toEqual('2023-12-31')
     expect(actualAmount).toEqual('500')
     expect(actualDescription).toEqual('Description Testing')

     

   //await page.pause() //pauso la ejecución 




}); 