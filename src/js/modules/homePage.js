import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";

export const homePage = () => {

    history.pushState(null, "", "home");

    cleanContainer()
    mainContent.innerHTML = "Estamos en el inicio"

}