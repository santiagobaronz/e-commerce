import { cleanContainer, mainContent } from "../main.js";
import { homePage } from "./homePage.js";
import { popUpAlert } from "./popAlert.js";
import { purchase } from "./purchase.js";

export const singleProduct = async (productId) => {

    history.pushState(null, "", `product`);
    cleanContainer()

    let product = [];

    await fetch(`/product/${productId}`)
    .then(data => data.json())
    .then(data => product = data);

    const {images} = JSON.parse(product[0].img_producto);
    const {colores} = JSON.parse(product[0].colores_producto);


    const getFormOptions = () => {
        
        if(product[0].categoria_producto == "ROPA"){
            const {tallas} = JSON.parse(product[0].stock_producto);
            return `
            <label>Talla del producto:</label>
            <select id="size">
                <option value="S">Talla S: ${tallas.S} unidades disponibles</option>
                <option value="M">Talla M: ${tallas.M} unidades disponibles</option>
                <option value="L">Talla L: ${tallas.L} unidades disponibles</option>
            </select>
            `
        }else{
            return `
            <div class='accessbox'>
            <span class="material-icons-outlined">info</span>
                <p class='accessories_stock'>Hay ${product[0].stock_producto} existencias de este producto</p>
            </div>
            `
        }
    }

    const getMaxProducts = (type = "") => {

        if(product[0].categoria_producto == "ROPA"){
            if(type == "" || type == "S"){
                const {tallas} = JSON.parse(product[0].stock_producto);
                return tallas.S
            }
            
            if(type == "M"){
                const {tallas} = JSON.parse(product[0].stock_producto);
                return tallas.M
            }

            if(type == "" || type == "L"){
                const {tallas} = JSON.parse(product[0].stock_producto);
                return tallas.L
            }
            
        }

        if(product[0].categoria_producto == "ACCESORIO"){
            const cantidad = (product[0].stock_producto);
            return cantidad;
        }

    }



    mainContent.innerHTML = `

    <p class='goBack'>< Volver al inicio</p>

    <div class='productPage'>
        <div class='productInfo'>
            <div class='imgsProduct'>
                <div class='smallImages'>
                    <img src='${images.firstImg}'>
                    <img src='${images.secondImg}'>
                </div>
                <img src='${images.preview}' class='mainImg'>
            </div>

            <div class='productDesc'>
                <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
                <p>${product[0].descripcion_producto}</p>

                <span>Código del producto: ${product[0].codigo_producto} </span>
            </div>

        </div>

        <div class='productForm'>

            <span>Producto nuevo | Universidad Distrital</span>
            <h2 class='productName'>${product[0].nombreCompleto_producto}</h2>
            <p class='productPrice'>$${product[0].precio_producto.toLocaleString("en")}</p>

            <div class='shipping-service'>
                <span class="material-icons-round">local_shipping</span>
                <p>Por apertura de nuestra tienda virtual, todos los productos contarán con pago 
                contra entrega y precio especial de envío de $6.500</p>
            </div>

            <form class='formProduct'>

                ${getFormOptions()}

                <label>Color del producto:</label>

                <div class='colors'>
                    <div>
                        <input id='principal' type="radio" id="principal" name="color" value="${colores.principal}">
                        <label for="principal">${colores.principal}</label><br>
                    </div>
                    <div>
                        <input id='secundario' type="radio" id="secundario" name="color" value="${colores.secundario}">
                        <label for="secundario">${colores.secundario}</label><br>
                    </div>
                    <div>
                        <input id='terciario' type="radio" id="terciario" name="color" value="${colores.terciario}">
                        <label for="terciario">${colores.terciario}</label>
                    </div>
                </div>
                
                <label>Cantida de productos:</label>
                <input class='numItems' type='number' min='0' max='${getMaxProducts()}' placeholder="0">


                <div class='finalPrice'>
                    <h4>Subtotal de compra</h4>
                    <div class='productList'>
                        <span class='tableTitle'>Producto</span>
                        <span class='tableTitle rightSide'>Precio</span>

                        <p id='productDetails'>${product[0].nombre_producto}</p>
                        <p class='rightSide' id='tableProductPrice'>$${product[0].precio_producto.toLocaleString("en")}</p>

                        <p>Servicio de envío</p>
                        <p class='rightSide'>$6,500</p>

                        <p>Total compra</p>
                        <p class='rightSide' id='totalPrice'>$${(product[0].precio_producto + 6500).toLocaleString("en")}</p>

                    </div>
                </div>

                <input type="submit" class="buyButton" value="Comprar ahora" disabled>

            </form>
        </div>
    </div>`;

    
    /**
     * Aqui actualizamos el maximo de productos segun la talla
     */

    const maxItems = document.querySelector(".numItems");
    const size = document.querySelector("#size")
    if(product[0].categoria_producto == "ROPA"){
        size.addEventListener("change", () => {
            maxItems.value = getMaxProducts(size.value);
            maxItems.setAttribute("max",  getMaxProducts(size.value))
        })
    }

    // Aqui si hay un cambio al elegir el color, activamos la tabla
    // de precios y activamos el boton

    let colorToSelect = "";

    const finalPurchase = () => {
        document.querySelector(".buyButton").disabled = false;
        document.querySelector(".finalPrice").style.display = "block";
    }

    const principal = document.querySelector("#principal");
    principal.addEventListener("change", () => {
        colorToSelect = "primario"
        finalPurchase();
    })

    const secundario = document.querySelector("#secundario");
    secundario.addEventListener("change", () => {
        colorToSelect = "secundario"
        finalPurchase();
    })

    const terciario = document.querySelector("#terciario");
    terciario.addEventListener("change", () => {
        colorToSelect = "terciario"
        finalPurchase();
    })

    /**
     * Aqui actualizamos el precio segun la cantidad seleccionada
     */

    maxItems.addEventListener("change", (e) => {

        e.preventDefault();

        const price = product[0].precio_producto * maxItems.value;
        const priceAndShipping = price + 6500;
        document.querySelector("#productDetails").innerHTML = `${product[0].nombre_producto} x ${maxItems.value}`
        document.querySelector("#tableProductPrice").innerHTML = `$${price.toLocaleString("en")}`;
        document.querySelector("#totalPrice").innerHTML = `$${priceAndShipping.toLocaleString("en")}`;
    })

    /**
     * Boton para volver al menu
     */

    const goBackButton = document.querySelector(".goBack");
    goBackButton.addEventListener("click", () => {
        homePage();
    })

    /**
     * Solicitar producto
     */

    const sendButton = document.querySelector(".buyButton");
    
    sendButton.addEventListener("click", (e) => {
        
        e.preventDefault();

        let maxToCompare = parseInt(maxItems.getAttribute("max"))
        if(maxToCompare == 0){
            popUpAlert("No hay más productos", "Este producto se encuentra agotado", "error")
        }

        if(parseInt(maxItems.value) >= 1 && parseInt(maxItems.value) <= maxToCompare 
        && parseInt(maxItems.value) != 0){
            if(product[0].categoria_producto == "ROPA"){
                purchase(product[0].id, maxItems.value, size.value , colorToSelect);
            }

            if(product[0].categoria_producto == "ACCESORIO"){
                purchase(product[0].id, parseInt(maxItems.value), "",colorToSelect);
            }
        }
    })
}