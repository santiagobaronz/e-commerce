import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";
import { singleProduct } from "./singleProduct.js";

export const homePage = async () => {

    history.pushState(null, "", "home");
    cleanContainer()

    let arrayProducts;

    await fetch("/products")
    .then(data => data.json())
    .then(data => arrayProducts = data);

    mainContent.innerHTML = `

    <img src='./src/assets/banner.jpg' class='main-banner'>

    <div class='featured'>
        <h2>Nuestros últimos lanzamientos</h2>
        <p>¡Conoce nuestros productos más recientes!</p>
        <div class='featured-products'></div>
    </div>

    <div class='clothes'>
        <h2>Colección de ropa de la Universidad Distrital</h2>
        <p>¡Ropa para vestir tu verdadera identidad universitaria!</p>
        <div class='clothes-products'></div>
    </div>

    <div class='accessories'>
        <h2>Colección de accesorios de la Universidad Distrital</h2>
        <p>¡Complementos para tu look universitario!</p>
        <div class='accessories-products'></div>
    </div>
    

    `

    const featuredProducts = document.querySelector(".featured-products");
    const clothesProducts = document.querySelector(".clothes-products")
    const accessoriesProducts = document.querySelector(".accessories-products")

    const getImage = product => {
        var image = JSON.parse(product.img_producto);
        return(image.images.preview)
    }
    
    arrayProducts.forEach(product => {

        if(product.destacado == "TRUE"){
            const productBox = document.createElement("div");
            productBox.className = "productBox";
            productBox.id = product.id;
            productBox.innerHTML = `
            
            <img src='${getImage(product)}'>
    
            <div>
                <h3>${product.nombre_producto}</h3>
                <p>$${product.precio_producto.toLocaleString("en")}</p>
            </div>`;
    
            featuredProducts.append(productBox);
        }

        if(product.categoria_producto == "ROPA"){
            const productBox = document.createElement("div");
            productBox.className = "productBox";
            productBox.id = product.id;
            productBox.innerHTML = `
            
            <img src='${getImage(product)}'>
    
            <div>
                <h3>${product.nombre_producto}</h3>
                <p>$${product.precio_producto.toLocaleString("en")}</p>
            </div>`;
    
            clothesProducts.append(productBox);
        }

        if(product.categoria_producto == "ACCESORIO"){
            const productBox = document.createElement("div");
            productBox.className = "productBox";
            productBox.id = product.id;
            productBox.innerHTML = `
            
            <img src='${getImage(product)}'>
    
            <div>
                <h3>${product.nombre_producto}</h3>
                <p>$${product.precio_producto.toLocaleString("en")}</p>
            </div>`;
    
            accessoriesProducts.append(productBox);
        }
    });

    const eventProducts = document.querySelectorAll(".productBox")
    eventProducts.forEach(product => {
        product.addEventListener("click", () => {
            singleProduct(product.id);
        })
    });


}