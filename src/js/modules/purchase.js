import { cleanContainer, mainContent } from "../main.js";
import { homePage } from "./homePage.js";
import { popUpAlert } from "./popAlert.js";
import { singleProduct } from "./singleProduct.js";

export const purchase = async (idProduct, totalProducts, sizeProduct = "", colorProduct) => {

    history.pushState(null, "", "purchase");
    cleanContainer()

    let productToBuy = []

    await fetch(`/product/${idProduct}`)
    .then(data => data.json())
    .then(data => productToBuy = data);

    const {images} = JSON.parse(productToBuy[0].img_producto);
    const {colores} = JSON.parse(productToBuy[0].colores_producto);
    let color = "";

    const getImage = () => {
        
        switch(colorProduct){
            case "primario":
                color = colores.principal;
                return images.preview
                break;
            case "secundario":
                color = colores.secundario;
                return images.firstImg
                break;
            case "terciario":
                color = colores.terciario;
                return images.secondImg
                break;
        }
    }

    const infoProduct = () => {
        
        if(productToBuy[0].categoria_producto == "ROPA"){
            return `Talla ${sizeProduct} | Color ${color}`
        }else{
            return `Color: ${color}`
        }

    }

    let price = productToBuy[0].precio_producto;
    price = price * totalProducts;
    let totalPrice = price + 6500;

    mainContent.innerHTML = `
    
    <p class='goBack'>Inicio < Volver al producto </p>
    
    <div class='sendProduct'>

        <div class='infoUser'>
            <h2>Formulario de envío</h2>

            <form>
            
                <p>Información de contacto</p>
                <div class='unitary-box-form'>
                    <label>Email o número de teléfono móvil</label>
                    <input type='text' id='contactInfo' placeholder='example@gmail.com'>
                </div>
                
                
                <p class='shippingInfo'>Direccion de envío</p>

                <div class='unitary-box-form'>
                    <label>Nombre completo</label>
                    <input type='text' id='fullName' placeholder='Jose Antonio Peréz'>
                </div>

                <div class='unitary-box-form'>
                    <label>Cédula de ciudadania o NIT</label>
                    <input type='text' id='document' placeholder='63872989'>
                </div>

                <div class='unitary-box-form'>
                    <label>Dirección</label>
                    <input type='text' id='address' placeholder='Carrera 75 # 102-35'>
                </div>

                <div class='unitary-box-form'>
                    <label>Apartamento, local, etc. (opcional)</label>
                    <input type='text' id='addressExtra' placeholder='Apto 201 Edificio Los Comuneros'>
                </div>

                <div class='rowForm'>

                    <div class='unitary-box-form'>
                        <label>País/región</label>
                        <input type='text' value='Colombia' disabled>
                    </div>

                    <div class='unitary-box-form'>
                        <label>Departamento</label>
                        <input type='text' value='Bogotá D.C' disabled>
                    </div>

                    <div class='unitary-box-form'>
                        <label>Ciudad</label>
                        <input type='text' value='Bogotá D.C' disabled>
                    </div>
                </div>

                <div class='unitary-box-form'>
                    <label>Teléfono</label>
                    <input type='text' id='phoneNumber' placeholder='3208279839'>
                </div>
            
            </form>
        </div>

        <div class='infoProduct'>
            <h2>Resumen de la compra</h2>
            <div class='card-product'>
                <img src='${getImage()}'>
                <div class='info-card'>
                    <p>${productToBuy[0].nombreCompleto_producto}</p>
                    <p>Información del producto: ${infoProduct()}</p>
                    <p>Cantidad: ${totalProducts}</p>
                </div>
            </div>

            <div class='finalPrice' style='display: block;'>
                    <h4>Subtotal de compra</h4>
                    <div class='productList'>
                        <span class='tableTitle'>Producto</span>
                        <span class='tableTitle rightSide'>Precio</span>

                        <p id='productDetails'>${productToBuy[0].nombre_producto} x ${totalProducts}</p>
                        <p class='rightSide' id='tableProductPrice'>$${price.toLocaleString("en")}</p>

                        <p>Servicio de envío</p>
                        <p class='rightSide'>$6,500</p>

                        <p>Total compra</p>
                        <p class='rightSide' id='totalPrice'>$${totalPrice.toLocaleString("en")}</p>

                    </div>
                </div>
                <p id='error-form'>Completa todos los campos!</p>
            <button class='buyButton' type='submit'>Realizar pedido</button>
        </div>
    
    
    </div>`;


    /**
     * Comprobacion del formulario
     */

    const buyButton = document.querySelector(".buyButton");
    buyButton.addEventListener("click", (e) => {
        e.preventDefault();
        buyProduct();
    })

    const getDate = () => {
        /* Creating a new date object and assigning it to the variable date. Then it is selecting the
        element with the class navbar-date and assigning it to the variable navbarDate. Then it is
        creating two objects, abbreviatedDays and months. */
        const date = new Date();
        const navbarDate = document.querySelector('.navbar-date');

        const abbreviatedDays = {
            0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles",
            4: "Jueves", 5: "Viernes", 6: "Sábado"
        }

        const months = {
            0: "Enero", 1: "Febrero", 2: "Marzo", 3: "Abril",
            4: "Mayo", 5: "Junio", 6: "Julio", 7: "Agosto",
            8: "Septiembre", 9: "Octubre", 10: "Noviembre", 11: "Diciembre"
        }

        /* Getting the day, month, date, year and then putting it all together in a string. */
        const monthOnDate = months[date.getMonth()];
        const numberOnDate = date.getDate();
        const yearOnDate = date.getFullYear();
        const finalDate = `${monthOnDate} ${numberOnDate} de ${yearOnDate}`;

        return finalDate;
    }
    

    function createOrderCode(){
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const charactersLength = characters.length;
        let result = "";
          for (let i = 0; i < 6; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
      
        return result;
    }

    const buyProduct = () =>{

        // Obtenemos los inputs

        const contactInfo = document.querySelector("#contactInfo").value;
        const fullName = document.querySelector("#fullName").value;
        const doc = document.querySelector("#document").value;
        const address = document.querySelector("#address").value;
        const addressExtra = document.querySelector("#addressExtra").value;
        const phoneNumber = document.querySelector("#phoneNumber").value;
        let errorMessage = document.querySelector("#error-form")

        if(contactInfo != "" && fullName != "" && doc != "" &&
            address != "" && phoneNumber != ""){
                errorMessage.style.display = "none";

                const infoPurchase = {
                    orderCode: createOrderCode(),
                    date: getDate(),
                    idProduct: idProduct,
                    nameProduct: productToBuy[0].nombreCompleto_producto,
                    descProduct: infoProduct(),
                    totalProducts: totalProducts,
                    sizeProduct: sizeProduct,
                    totalPrice: totalPrice,
                    colorProduct: colorProduct,
                    category: productToBuy[0].categoria_producto,
                    contactInfo: contactInfo,
                    name: fullName,
                    doc: doc,
                    address: address + " " + addressExtra,
                    phoneNumber: phoneNumber
                }

                let shoppingInfo = JSON.stringify(infoPurchase)
                fetch(`/order/create/${shoppingInfo}`)
                .then(status => status.json())
                .then(status => {
                    if(status){
                        fetch(`/update/product/${shoppingInfo}`)
                        .then(status => status.json)
                        .then(status => {
                            if(status){
                                popUpAlert("Gracias por tu compra!", "Tu pedido ha sido recibido y nos comunicaremos pronto contigo", "success")
                                homePage();
                            }
                        })
                    }
                })
            }else{
                errorMessage.style.display = "block";
            }
    }

    /**
     * Color de borde cuando esta seleccionado
     */

    const pruebaBox = document.querySelectorAll(".unitary-box-form");
    pruebaBox.forEach(element => {
        element.addEventListener("click", () => {
            element.style.border = '2px solid rgb(0, 149, 255)';
        })
        element.addEventListener("mouseout", () => {
            element.style.border = '1px solid rgb(209, 209, 209)';
        })
    });

    /**
     * Boton para volver al producto
     */

     const goBackButton = document.querySelector(".goBack");
     goBackButton.addEventListener("click", () => {
        singleProduct(idProduct)
     })

}