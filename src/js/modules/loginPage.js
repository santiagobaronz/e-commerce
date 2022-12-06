import { cleanContainer, mainContent } from "../main.js";
import { orderPage } from "./orderPage.js";
import { popUpAlert } from "./popAlert.js";

export const loginPage = () => {

    history.pushState(null, "", "login");
    cleanContainer()

    function readCookie(name) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }

    let loginCookie = readCookie( "logueo");

    if(loginCookie){
        orderPage();
    }else{
        mainContent.innerHTML = `
    
        <div class='login-section'>
            <div class='login-box'>
                <img src='./src/assets/logo_horizontal.png' class='login-img'>
                <div class='form-login'>
                    <h2>Iniciar sesión como administrador</h2>
                    <form>
                        <label>Correo electrónico</label>
                        <input id='adminEmail' type='text' placeholder='admin@udistrital.edu.co' class='input-form'>
                        <label>Contraseña</label>
                        <input id='adminPassword' type='password' placeholder='*************' autocomplete class='input-form'>
                        <p id='error-form'>Completa todos los campos!</p>
                        <input type='submit' class='loginButton' value='Iniciar sesión'>
                    </form>
                </div>
            </div>
        </div>`;
    
        const loginButton = document.querySelector(".loginButton");
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            
            let adminMail = document.querySelector("#adminEmail").value;
            let adminPassword = document.querySelector("#adminPassword").value;
            let errorMessage = document.querySelector("#error-form")
    
            if(adminMail == "" || adminPassword == ""){
                errorMessage.style.display = "block";
            }else{
                fetch(`./admins/${adminMail}/${adminPassword}`)
                .then(status => status.json())
                .then(status => {
    
                    if(status){
                        document.cookie = "logueo=true; max-age=300; path=/";
                        orderPage();
                    }else{
                        errorMessage.style.display = "block";
                        errorMessage.innerHTML = "El correo o contraseña no coinciden"
                    }
    
                });
            }
    
        })
    }
}