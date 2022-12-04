import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";

export const orderPage = (orderToFind = "") => {

    cleanContainer();

    let orderArray = [], fetchURL, countOrders;

    (orderToFind != "") ? fetchURL = `/orders/${orderToFind}` : fetchURL = "/orders";

    await fetch(fetchURL)
    .then(data => data.json())
    .then(data => orderArray = data);

    (orderArray != false) ? countOrders = orderArray.length : countOrders = 0;

}