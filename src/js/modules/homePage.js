import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";

export const homePage = () => {

    cleanContainer()
    mainContent.innerHTML = "Estamos en el inicio"

}