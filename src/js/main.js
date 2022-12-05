/* Imports */

import { homePage } from "./modules/homePage.js";
import { loginPage } from "./modules/loginPage.js";
import { orderPage } from "./modules/orderPage.js";
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

    let url = location.href;
    url = url.split("/").reverse()[0];
    console.log(url)

    switch(url){
        case "":
            homePage();
            history.pushState(null, "", "home");
            break;
        case "home":
            homePage();
            history.pushState(null, "", "home");
            break;
        case "login":
            loginPage();
            break;
        case "dashboard":
            orderPage();
            break;
    }
    fetch("/visits/update");
})

/* Menu links listeners */

const loginButton = document.querySelector("#login-button");
const footerLogin = document.querySelector("#footer-login")
loginButton.addEventListener("click", () => {loginPage();})
footerLogin.addEventListener("click", () => {loginPage();})

const iconHome = document.querySelector(".logo-ud-identity");
const linkHome = document.querySelector("#link_home");
iconHome.addEventListener("click", () => {homePage()});
linkHome.addEventListener("click", () => {homePage()});


const instagramLink = document.querySelector("#instagramLink");
const whatsappLink = document.querySelector("#whatsappLink")
instagramLink.addEventListener("click", () => {
    popUpAlert("¡Ha ocurrido un problema!","Estamos en fase de pruebas, aún no tenemos Instagram","warning")
})
whatsappLink.addEventListener("click", () => {
    popUpAlert("¡Ha ocurrido un problema!","Estamos en fase de pruebas, aún no tenemos Whatasapp","warning")
})


