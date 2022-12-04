import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";

export const orderPage = async (orderToFind = "") => {

    cleanContainer();

    const main = document.querySelector("main")
    main.style.backgroundColor = "#080c17"

    let orderArray = [], fetchURL, countOrders;

    (orderToFind != "") ? fetchURL = `/orders/${orderToFind}` : fetchURL = "/orders";

    await fetch(fetchURL)
    .then(data => data.json())
    .then(data => orderArray = data);

    (orderArray != 'no_results') ? countOrders = orderArray.length : countOrders = 0;

    const createButton = () => {
        if(fetchURL != '/orders'){
            return `<div id='showAllButton'>
                        <button class='showAllButton'>Mostrar todo</button>
                    </div>`
        }
        return "";
    }

    const findOrderSection = document.createElement("div");
    findOrderSection.className = "findOrderSection";
    findOrderSection.innerHTML = `

    <h1>Estadísticas de la tienda</h1>

    <div class='orderMetrics'>
        <div class='metric2_card'>
            <div class='metric_product'>
                <img src='./src/assets/orden.png' class='metric2_imgs'>
                <p>${countOrders} pedidos realizados</p>
            </div>
            <div class='metric_product'>
                <img src='./src/assets/producto.png' class='metric2_imgs'>
                <p>13 productos vendidos</p>
            </div>
            
        </div>
        <div class='metric_card'>
            <img src='./src/assets/ingresos.png' class='metric_imgs'>
            <div class='metricText'>
                <p>Ingresos recibidos</p>
                <p>$400.000</p>
            </div>
        </div>
        <div class='metric_card'>
            
        </div>
    </div>

    <div class='findInput'>
        <div>
            <h2>Ordenes</h2>
            <p class='totalOrders'>Se encontraron ${countOrders} órdenes</p>
        </div>
        <div>
            <input type='text' id='filterInput' placeholder='Filtrar por código de producto (Ej: AT9081)'>
            <button id='filterButton'><img src='./src/assets/lupa.png'></button>
        </div>
    </div>

    <div id='results'></div>

    ${createButton()}
    
    `

    mainContent.append(findOrderSection);

    const orderList = document.querySelector("#results");
    const filterInput = document.querySelector("#filterInput")
    const filterButton = document.querySelector("#filterButton");
    const showAllButton = document.querySelector(".showAllButton")

    filterButton.addEventListener('click', () => {
        if(filterInput.value != ""){
            const orderToFind = filterInput.value;
            orderPage(orderToFind);
        }
    });

    filterInput.addEventListener('keyup', function(e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13 && filterInput.value != "") {
            const orderToFind = filterInput.value;
            orderPage(orderToFind);
        }
    });

    if(fetchURL != "/orders"){
        showAllButton.addEventListener("click", () => {
            orderPage();
        })
    }

    const defineStatus = (status) => {
        let productStatus = "";
        (status == "Pendiente") ? productStatus = "pending" : productStatus = "paid";
        return productStatus;
    }

    if(orderArray != "no_results"){



        orderArray.forEach(order => {

        const orderBox = document.createElement("div");
        orderBox.className = "orderBox";
        orderBox.id = order.id;

        orderBox.innerHTML = `
        <div class='order-item'>
            <p class='orderCode'>${order.codigo_orden}</p>
        </div>
        
        <div class='order-item'>
            <span class="material-icons-round icon-menu">calendar_month</span>
            <p class='orderDate'>Agosto 19 de 2022</p>
        </div>
        <div class='order-item'>
            <span class="material-icons-round icon-menu">person</span>
            <p class='orderInfo'>${order.nombre_cliente}</p>
        </div>

        <div class='order-item'>
        <span class="material-icons-round icon-menu">credit_card</span>
        <p class='orderPrice'>$${order.precio_total.toLocaleString("en")}</p>
        </div>

        <div class='order-item'>
        <p class='orderStatus ${defineStatus(order.estado_envio)}'>${order.estado_envio}</p>
        </div>

        <span class="material-icons-round icon-menu arrow-order">keyboard_arrow_right</span>
        `
        orderList.append(orderBox);

        })
    }
}