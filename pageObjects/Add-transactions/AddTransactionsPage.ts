import {Locator, Page} from '@playwright/test' 
import { time } from 'console'
export class AddTransactionsPage {

    private readonly page: Page //para tener acceso a la pagina y esperar un tiempo 
    private readonly addTransactionButton: Locator
    private readonly transactionDate: Locator
    private readonly transactionAmount: Locator
    private readonly transactionDescription: Locator
    private readonly saveTransactionButton: Locator
   
    constructor(page: Page){
        this.page = page
        this.addTransactionButton= page.locator("//button[contains(text(),\'Añadir transacción\')]")
        this.transactionDate= page.locator('id=date')
        this.transactionAmount= page.locator('id=amount')
        this.transactionDescription= page.locator('id=description')
        this.saveTransactionButton= page.locator('//button[contains(text(),\'Guardar\')]')
    }

    //metodos

    //metodo para agregar transacciones y reutilizar el codigo
    async addTransaction(transactionDate: string, transactionAmount: string, transactionDescription: string){
    await this.addTransactionButton.click()
    await this.transactionDate.fill(transactionDate)
    await this.transactionAmount.fill(transactionAmount)
    await this.transactionDescription.fill(transactionDescription)
    await this.page.waitForTimeout(2000)

    await this.saveTransactionButton.click()
}

    /*await page.locator("//button[contains(text(),\'Añadir transacción\')]").click()


    await page.locator('id=date').fill('2023-12-31')
    await page.locator('id=amount').fill('500')
    await page.locator('id=description').fill('Description Testing')
    await page.locator('//button[contains(text(),\'Guardar\')]').click()*/
}