/* Imports */

import { homePage } from "./modules/homePage.js";
import { loginPage } from "./modules/loginPage.js";
import { popUpAlert } from "./modules/popAlert.js";

/* First const get the objet to use in modules
    and the function deletes all the contents of the parent container */

export const mainContent = document.querySelector(".main-content");
export const cleanContainer = () => {
    mainContent.innerHTML = "";
    const main = document.querySelector("main")
    main.style.backgroundColor = "var(--white)"
}

/* Main content is charged when the window is loaded */

window.addEventListener("load", () => {
    homePage();
    fetch("/visits/update");
})

/* Menu links listeners */

const loginButton = document.querySelector("#login-button");
const footerLogin = document.querySelector("#footer-login")
loginButton.addEventListener("click", () => {
    loginPage();
})
footerLogin.addEventListener("click", () => {
    loginPage();
})


const instagramLink = document.querySelector("#instagramLink");
const whatsappLink = document.querySelector("#whatsappLink")
instagramLink.addEventListener("click", () => {
    popUpAlert("¡Ha ocurrido un problema!","Estamos en fase de pruebas, aún no tenemos Instagram","warning")
})
whatsappLink.addEventListener("click", () => {
    popUpAlert("¡Ha ocurrido un problema!","Estamos en fase de pruebas, aún no tenemos Whatasapp","warning")
})


