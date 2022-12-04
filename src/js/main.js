/* Imports */

import { homePage } from "./modules/homePage.js";
import { loginPage } from "./modules/loginPage.js";

/* First const get the objet to use in modules
    and the function deletes all the contents of the parent container */

export const mainContent = document.querySelector(".main-content");
export const cleanContainer = () => {
    mainContent.innerHTML = "";
}

/* Main content is charged when the window is loaded */

window.addEventListener("load", () => {
    homePage();
})

/* Menu links listeners */

const loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", () => {
    loginPage();
})

