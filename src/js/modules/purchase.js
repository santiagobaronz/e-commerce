import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";
import { singleProduct } from "./singleProduct.js";

export const purchase = async (idProduct, totalProducts, sizeProduct = "", colorProduct) => {

    history.pushState(null, "", "purchase");
    cleanContainer()

    console.log(idProduct, totalProducts, sizeProduct, colorProduct);

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
            return `Talla ${sizeProduct} | Color: ${color}`
        }else{
            return `Color: ${color}`
        }

    }

    let price = productToBuy[0].precio_producto;
    price = price * totalProducts;
    let totalPrice = price + 6500;

    mainContent.innerHTML = `
    
    
    <div class='sendProduct'>

        <div class='infoUser'>
            <h2>Formulario de envío</h2>

            <form>
            
            <p>Información de contacto</p>
            <div class='unitary-box-form'>
                <label>Email o número de teléfono móvil</label>
                <input type='text' id='' placeholder='example@gmail.com'>
            </div>
            
            
            <p class='shippingInfo'>Direccion de envío</p>

            <div class='unitary-box-form'>
                <label>Nombre completo</label>
                <input type='text' id='' placeholder='Jose Antonio Peréz'>
            </div>

            <div class='unitary-box-form'>
                <label>Cédula de ciudadania o NIT</label>
                <input type='text' id='' placeholder='63872989'>
            </div>

            <div class='unitary-box-form'>
                <label>Dirección</label>
                <input type='text' id='' placeholder='Carrera 75 # 102-35'>
            </div>

            <div class='unitary-box-form'>
                <label>Apartamento, local, etc. (opcional)</label>
                <input type='text' id='' placeholder='Apto 201 Edificio Los Comuneros'>
            </div>

            <div class='rowForm'>

                <div class='unitary-box-form'>
                    <label>País/región</label>
                    <input type='text' id='' value='Colombia' disabled>
                </div>

                <div class='unitary-box-form'>
                    <label>Departamento</label>
                    <input type='text' id='' value='BOGOTÁ D.C' disabled>
                </div>

                <div class='unitary-box-form'>
                    <label>Ciudad</label>
                    <input type='text' id='' value='BOGOTÁ D.C' disabled>
                </div>
            </div>


            <div class='unitary-box-form'>
                <label>Teléfono</label>
                <input type='text' id='' placeholder='3208279839'>
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
            <button class='buyButton' type='submit'>Realizar pedido</button>
        </div>
    
    
    </div>
    
    `


}