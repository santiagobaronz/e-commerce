import { cleanContainer, mainContent } from "../main.js";
import { popUpAlert } from "./popAlert.js";

export const homePage = () => {

    history.pushState(null, "", "home");
    cleanContainer()

    const arrayPrueba = [
        {
            nombre: "Perro 1",
            linkImagen: "https://i.pinimg.com/236x/e3/9a/48/e39a48eddff28efb01da216ef7fea6fc--teacup-pomeranian-puppy-pomeranian-for-adoption.jpg"
        },{
            nombre: "Perro 2",
            linkImagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfBG8QGU9_PC6Ze6pJdAU8O8vpNP80-ICghPr6PGNvdLIRdfi3TTAtfDFB5f5uB4YK6E&usqp=CAU"
        }];

    mainContent.innerHTML = `
    
    <h1>Esto son los productos</h1>

    <div class='divContenedor'>

    </div>

    `;

    const divContenedor = document.querySelector(".divContenedor");

    arrayPrueba.forEach(element => {
        const parrafo = document.createElement("p");
        parrafo.className = "cajaPerros"
        parrafo.innerHTML = `<div>
        
            <img src="${element.linkImagen}" width='100px'>
            Nombre del producto: ${element.nombre}
        
        </div>`
        divContenedor.append(parrafo);
    });
}