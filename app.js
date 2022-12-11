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

app.get('/home', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile(__dirname + '/index.html')
})

app.get('/dashboard', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile(__dirname + '/index.html')
})

app.get('/product', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile(__dirname + '/index.html')
})

/***************************************************************
 *                          Visits 
***************************************************************/

app.get('/visits/:query', (req, res) => {

    const {query} = req.params;

    if(query == "get"){
        const sql = `SELECT visitas FROM metrics WHERE id = '1' `;
        connection.query(sql, (error, results) => {
            if (error)
                throw error;
            if (results.length > 0) {
                let string = JSON.stringify(results);
                let json = JSON.parse(string);
                let visits = json[0].visitas;
                res.json(visits);
            } else {
                res.send(false);
            }
        })
    }

    if(query == "update"){
        const sql = `SELECT visitas FROM metrics WHERE id = '1' `;
        connection.query(sql, (error, results) => {
            if (error)
                throw error;
            if (results.length > 0) {
                let string = JSON.stringify(results);
                let json = JSON.parse(string);
                let visits = json[0].visitas + 1;

                const sql2 = `UPDATE metrics SET visitas = ${visits} WHERE id = 1`;
                connection.query(sql2, (error, results) => {
                    if (error)
                        throw error;
                })
            } else {
                res.send(false);
            }
        })
    }
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
 *                          Products 
***************************************************************/

app.get('/products' , (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('no_results')
        }
    });
})

app.get('/product/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM products WHERE id = '${id}'`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('no_results')
        }
    });
});

/***************************************************************
 *                          Orders
***************************************************************/

app.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('no_results')
        }
    });
});

app.get('/orders/:order', (req, res) => {
    const {order} = req.params;
    console.log(order);
    const sql = `SELECT * FROM orders WHERE codigo_orden = '${order}'`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('no_results')
        }
    });
});

/***************************************************************
 *                          Port 
***************************************************************/

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));