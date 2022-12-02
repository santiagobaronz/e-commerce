/* Imports */

import { homePage } from "./modules/homePage.js";

/* Main content is charged when the window is loaded */

window.addEventListener("load", () => {
    homePage();
})

/* First const get the objet to use in modules
    and the function deletes all the contents of the parent container */

export const mainContent = document.querySelector(".main-content");
export const cleanContainer = () => {
    mainContent.innerHTML = "";
}