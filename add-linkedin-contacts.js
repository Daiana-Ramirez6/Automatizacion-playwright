//console.log("Hello world");
const { chromium } = require("playwright"); 

const {spawn} = require("child_process");

(async () => { //funcion anonima autoejecutable
    const chrome =spawn(
    "C:/Program Files/Google/Chrome/Application/chrome.exe" , //ruta del ejecutable de chrome
    ["--remote-debugging-port=9222",
    "--user-data-dir=C:/ChromeDevSession",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-first-run-ui",
    "--new-window"] ,//argumentos para abrir chrome en modo depuracion, modo depuración es para que puppeteer pueda controlar el navegador y puppeteer es una libreria de nodejs para controlar el navegador
    {shell:false} //en false es para que no use el shell del sistema operativo, true es para que use el shell del sistema operativo, en windows es recomendable usar false
    //esto es para que funcione en windows
)

    await new Promise(r => setTimeout(r, 3000)); //espera 3 segundos para que abra el navegador
    //hay una instancia de chrome abierta en modo depuracion y yo quiero que puppeteer se conecte a esa instancia de chrome, over de CDP es para que se conecte a una instancia de chrome que ya esta abierta
    const browser = await chromium.connectOverCDP("http://127.0.0.1:9222"); //conecta con el navegador en modo depuracion, modo depuración es para que puppeteer pueda controlar el navegador
    const defaultContext = browser.contexts()[0] //obtiene el contexto por defecto del navegador porque de todos los contextos que hay en el navegador, el contexto por defecto es el que tiene las cookies y las sesiones guardadas y se conecta al primer contexto, un contexto es como una ventana del navegador
    const page= defaultContext.pages()[0]; //obtiene la primera pestaña del navegador, una pestaña es como una pagina del navegador, una pestaña es diferente del contexto porque una pestaña es una pagina del navegador y un contexto es una ventana del navegador, y la pagina y ventana son diferentes porque una ventana puede tener varias pestañas

    await page.goto("https://www.linkedin.com/mynetwork/"); //navega a la pagina de conexiones de linkedin
    const allContactsFromBogota = "//h2[contains(., 'People you may know in Bogotá D.C. Metropolitan Area')]/ancestor::div[@class='discover-sections-list__item']//ul/li";
    const occupation = "//span[contains(@class, 'discover-person-card__occupation')]";
    const connectButton = "//button[contains(., 'Connect')]";
    const contactName = "//span[contains(@class, 'discover-person-card__name')]";
    await page.waitForTimeout(6000);

    for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
    }

    const allContacts = await page.locator(allContactsFromBogota).all();
    await allContacts.at(0).scrollIntoViewIfNeeded();

    console.log("Number of Contacts found:", allContacts.length);

    for (let contact of allContacts) {
    let currentRole = await contact.locator(occupation).textContent();
    console.log(currentRole);
    }
        const matches = ["qa", "automation", "pruebas"];
    const contactsThatMatch = [];

    console.log("Start: All contacts that match");

    for (let contact of allContacts) {
    let currentRole = await contact.locator(occupation).textContent()
        .then(x => x?.toLocaleLowerCase());

    for (let match of matches) {
        if (currentRole && currentRole.includes(match)) {
        contactsThatMatch.push(contact);
        break;
        }
    }
    }

    console.log("End: All contacts that match");
    console.log("Contacts that match:", contactsThatMatch.length);

    for (let contact of contactsThatMatch) {
    let currentRole = await contact.locator(occupation).textContent();
    let currentName = await contact.locator(contactName).textContent();
    await contact.locator(connectButton).click();

    console.log("Inviting to:", currentName);
    console.log("Adding the role:", currentRole);

    await page.waitForTimeout(4000);
    }



})(); //este parentesis de aqui es para que se ejecute la funcion inmediatamente



