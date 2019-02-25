const {Pool} = require('pg')
const express = require("express")
const {Product} = require( "./model/Product.js")

const app = express()
const port=3002
const dbClient=new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'pass',
    database:'bookshop'
})

app.get('/getBooks',(req,res)=>{
    Product.getProduct(
        dbClient,
        req.query.cat_id,
        req.query.subcat_id,
        req.query.man_id)
        .then(dbRes=>{
            res.send(dbRes.rows)
        }).catch(err=>{
            console.log(err)
        })
})



app.get('/getGenres',(req,res)=>{

    
})

app.get('')

app.listen(port,()=>console.log('listening on '+port))