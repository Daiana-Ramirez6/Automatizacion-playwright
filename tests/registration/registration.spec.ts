import {test, expect} from '@playwright/test'
//parar que guarde imagenes en el reporte debo crear el testInfo
test('registration', async({page}, testInfo)=> {
await page.goto('http://127.0.0.1:5501/register.html')

const name='Daiana'
const lastName='Ramírez'
const age='10'
const country='Colombia'
const email='Dramirez@voyenbus.com'
const sex='M'

await page.locator("id=name").fill(name)
await page.locator("id=last-name").fill(lastName)
await page.locator("xpath=//label[contains(., 'Edad')]//following-sibling::input").fill(age)  //acá me ubico en el contenedor que tiene edad pero con following-sibling::input quiero decir que tome al hermano que seria el input  type=number
await page.locator("id=country").selectOption(country) //le paso la opción que queremos seleccionar
await page.locator(`input[value='${sex}']`).click() // esto es un css selector
await page.locator("id=email").fill('Dramirez@voyenbus.com') //`
//para los checkboxes
await page.locator("id=monday").click() //selecciona directamente la opción de monday 

// para selección de archivos
await page.locator("id=picture").setInputFiles('images/image.png') 

//para guardar la captura de pantalla en el reporte
await testInfo.attach('register1',{
    body: await page.screenshot(),
    contentType: 'image/png'
})

//para guardar la captura de pantalla
//entonces dice en la carpeta de screenshots guardame una captura de pantalla con este nombre y que sea de toda la página
//await page.screenshot({path:'screenshots/register1.png', fullPage:true}) //fullpage para que tome toda la página
//cada await es una promesa, o la promesa se rechaza o se acepta, entonces le digo que se ponga a escuchar el evento antes de hacer click y cuando eso suceda yo voy a almacenar el resultado acá


const [summaryPage] = await Promise.all([ //el resultado de esta promesa en una nueva pagina
    page.waitForEvent('popup'), //se emite cuando la página abre un nuevo tab o nueva ventana
    page.locator("id=save-btn").click()
])


await summaryPage.waitForLoadState()  //se espera que se cargue la nueva página 
await expect (summaryPage).toHaveTitle('Summary') //sobre la nueva pagina podemos hacer operaciones 

//para comparar los datos que cargamos sean iguales con los mostrados
const currentName= await summaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::p").textContent() //nos devuelve todo el texto, nombre como julian 
const currentLastName= await summaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::p").textContent() 
const currentAge= await summaryPage.locator("//strong[contains(.,'Edad')]/ancestor::p").textContent()

//ahora tenemos que compararlos 

expect(currentName).toContain(name) //comparamos lo que obtenemos vs lo que enviamos 
expect(currentLastName).toContain(lastName)
expect(currentAge).toContain(age)

await testInfo.attach('register2',{
    body: await page.screenshot(),
    contentType: 'image/png'
})
//await summaryPage.screenshot({path:'screenshots/register2.png', fullPage:true})  //para sacar captura de pantalla de la nueva página


await page.pause()
})


//para probar que se ejecute 3 veces el test
test('registration fail', async({page}, testInfo)=> {
await page.goto('http://127.0.0.1:5501/register.html')

const name='Daiana'
const lastName='Ramírez'
const age='10'
const country='Colombia'
const email='Dramirez@voyenbus.com'
const sex='M'

await page.locator("id=name").fill(name)
//para obligar que falle el test
expect(true).toEqual(false) //esto nunca va a ser cierto 




})