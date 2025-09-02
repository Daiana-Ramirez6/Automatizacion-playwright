import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pageObjects/login/LoginPage';
import { AddTransactionsPage } from '../../pageObjects/Add-transactions/AddTransactionsPage'; 
import { faker } from '@faker-js/faker';
import { NavigateTo } from '../../pageObjects/navigate/NavigateTo';

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

//para failed
test('login failed', async({page})=> {

    //await page.goto('http://127.0.0.1:5500/login.html')
    //aplico step para navegar a la pagina de login
    await test.step('Navigate to the login page', async()=> {
    const navigateTo= new NavigateTo(page)
    await navigateTo.loginPage()
   })

    const transactionDate= '2023-12-31'
    const transactionAmount= '500'
    const transactionDescription= 'Description Testing'

    await test.step('log in', async()=> {
    const loginPage= new LoginPage(page)
    /*await loginPage.fillUsername
    await loginPage.fillPassword
    await loginPage.clickOnLoginButton()*/
    await loginPage.doLogin('user', 'pass')
    })

    await page.waitForTimeout(2000)

    await test.step('Add transaction', async()=> {
    const addTransactionsPage= new AddTransactionsPage(page) //la constante empieza con minuscula porque es una instancia de la clase
    await addTransactionsPage.addTransaction(transactionDate, transactionAmount, transactionDescription)
    expect(await addTransactionsPage.getActualAmount("1")).toEqual(transactionAmount)
    expect(await addTransactionsPage.getActualDescription("1")).toEqual(transactionDescription)
    expect(await addTransactionsPage.getActualDate("1")).toEqual(transactionDate) 
    })

  



    /*await page.locator('input#username').fill('user') //localice este elemento y coloque este texto 
    await page.locator('input#password').fill('pass')
    await page.locator("//button[@type= \'submit\']").click()*/ //realizo un click porque es un botton 
 



    
    //agregamos asserciones 
    //creo una constante donde voy a almacenar el texto que voy a extraer de donde se encuentra este xpath, esto permite almacenar un valor como string cualquier valor 
    /*const actualDate= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent() //de ese localizador deme el contenido, el texto que tiene 
     const actualAmount= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
     const actualDescription= await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()*/

     //ahora si hacemos una aserción 
     //expect(actualDate).toEqual('2023-12-31')
     /*expect(await addTransactionsPage.getActualAmount("1")).toEqual(transactionAmount)
     expect(await addTransactionsPage.getActualDescription("1")).toEqual(transactionDescription)
      expect(await addTransactionsPage.getActualDate("1")).toEqual(transactionDate) */
     //expect(actualDescription).toEqual('Description Testing')

     

   //await page.pause() //pauso la ejecución 




}); 