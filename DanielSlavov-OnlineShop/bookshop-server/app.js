const {Pool} = require('pg')
const express = require("express")
const Product = require( "./model/Product.js")

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
    Product.getBooks(
        dbClient,{
            genre_id:req.query.genre_id,
            author_id:req.query.author_id,
            publisher_id:req.query.publisher_id
        }).then(dbRes=>{
            res.send(dbRes.rows)
        })
})
app.get('/getMerch',(req,res)=>{
    Product.getMerch(dbClient,{
        category_id:req.query.category_id,
        manufacturer_id:req.query.manufacturer_id
    }).then(dbRes=>{
        res.send(dbRes.rows)
    })
})

app.get('/getGenres',(req,res)=>{
    Product.getFromTable(dbClient,"Genres")
    .then(dbRes=>{
        res.send(dbRes.rows)
    })
})
app.get('/getGenre',(req,res)=>{
    Product.getFromTableById(dbClient,"Genres",req.query.params.id)
    .then(dbRes=>{
        res.send(dbRes.rows[0])
    })
})
app.get('/getAuthors',(req,res)=>{
    Product.getFromTable(dbClient,"Authors")
    .then(dbRes=>{
        res.send(dbRes.rows)
    })
})
app.get('/getAuthor',(req,res)=>{
    Product.getFromTableById(dbClient,"Authors",req.query.params.id)
    .then(dbRes=>{
        res.send(dbRes.rows[0])
    })
})
app.get('/getPublishers',(req,res)=>{
    Product.getFromTable(dbClient,"Publishers")
    .then(dbRes=>{
        res.send(dbRes.rows)
    })
})
app.get('/getPublisher',(req,res)=>{
    Product.getFromTableById(dbClient,"Publishers",req.query.params.id)
    .then(dbRes=>{
        res.send(dbRes.rows[0])
    })
})
app.get('/getManufacturers',(req,res)=>{
    Product.getFromTable(dbClient,"Manufacturers")
    .then(dbRes=>{
        res.send(dbRes.rows)
    })
})
app.get('/getManufacturer',(req,res)=>{
    Product.getFromTableById(dbClient,"Manufacturers",req.query.params.id)
    .then(dbRes=>{
        res.send(dbRes.rows[0])
    })
})
app.get('/getCategories',(req,res)=>{
    Product.getFromTable(dbClient,"Categories")
    .then(dbRes=>{
        res.send(dbRes.rows)
    })
})
app.get('/getCategory',(req,res)=>{
    Product.getFromTableById(dbClient,"Categories",req.query.params.id)
    .then(dbRes=>{
        res.send(dbRes.rows[0])
    })
})


app.listen(port,()=>console.log('listening on '+port))