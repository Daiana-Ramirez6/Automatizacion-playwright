import {Locator, Page} from '@playwright/test' 
import { time } from 'console'

export class AddTransactionsPage {

    private readonly page: Page //para tener acceso a la pagina y esperar un tiempo 
    private readonly addTransactionButton: Locator
    private readonly transactionDate: Locator
    private readonly transactionAmount: Locator
    private readonly transactionDescription: Locator
    private readonly saveTransactionButton: Locator

   
    private actualDateRow:Locator
    private actualAmountRow:Locator
    private actualDescriptionRow:Locator

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

    async getActualAmount(row:string){
        this.actualAmountRow= this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await this.actualAmountRow.textContent() //retorna una promesa

    }

    async getActualDescription(row:string){
        this.actualDescriptionRow= this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await this.actualDescriptionRow.textContent() //retorna una promesa
} 

    async getActualDate(row:string){
        this.actualDateRow= this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await this.actualDateRow.textContent() //retorna una promesa       
    }
  }