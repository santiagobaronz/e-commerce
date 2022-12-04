const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { default: fetch } = require('node-fetch');
const mysql = require('mysql');
require('dotenv').config({path:'./.env'})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));
app.use(express.json());

/***************************************************************
 *                     Database connection 
***************************************************************/

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect(error => {
    if(error) throw error;
    console.log('Base de datos conectada')
})

/***************************************************************
 *                          Routes 
***************************************************************/

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./index.html')
})

/***************************************************************
 *                          Login 
***************************************************************/

app.get('/admins/:email/:password', (req, res) => {
    const {email, password} = req.params;
    const sql = `SELECT * FROM admin WHERE correo = '${email}' AND clave_seguridad = '${password}'`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.send(true);
        }else{
            res.send(false);
        }
    });
})


/***************************************************************
 *                          Port 
***************************************************************/

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));