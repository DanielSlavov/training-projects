const {Pool} = require('pg')
const express = require("express")
const Product = require( "./model/Product.js")
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
var cors = require('cors');

const app = express()
const port=3002
const dbClient=new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'pass',
    database:'bookshop'
})

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/getBookByProductId',(req,res)=>{
    Product.getBookById(dbClient,req.query.id).then(dbres=>{
        console.log(req.query.id)
        res.send(dbres.rows[0])
    })

    
})


app.post('/addBook',(req,res)=>{
    console.log(req.body);
    Product.addBook(dbClient,req.body)//{name:"Book",author_id:1,publisher_id:1,genre_id:1,description:'description',price:2,quantity:3})
    .then(dbres=>{
        res.send("success")
    }).catch(err=>{
        res.send("error")
    })
})
app.post('/addOtherProduct',(req,res)=>{
    //TODO
})
app.post('/addAuthor',(req,res)=>{
    Product.addToTable(dbClient,"Authors",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.post('/addPublisher',(req,res)=>{
    Product.addToTable(dbClient,"Publishers",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.post('/addGenre',(req,res)=>{
    Product.addToTable(dbClient,"Genres",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.post('/addCategory',(req,res)=>{
    Product.addToTable(dbClient,"Categories",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.post('/addManufacturer',(req,res)=>{
    Product.addToTable(dbClient,"Manufacturers",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})





app.get('/getBooks',(req,res)=>{
    Product.getBooks(
        dbClient,{
            genre_id:req.query.genre_id,
            author_id:req.query.author_id,
            publisher_id:req.query.publisher_id
        }).then(dbRes=>{
            console.log(dbRes.rows)
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