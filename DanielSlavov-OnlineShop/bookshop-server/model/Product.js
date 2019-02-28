const isRequired=()=>{throw new error("param is required")}
class Product{
    constructor(obj){
        this.id=obj.id
        this.name=obj.name
        this.price=obj.price
        this.quantity=obj.quantity
    }
    
    static getBooks(dbClient,filter_obj={genre_id,author_id,publisher_id}){
        var query="SELECT * from Products P INNER JOIN Books B on P.id=B.product_id"

        if(filter_obj!={})
        {
            var params=[]
            if(filter_obj.category_id){
                params.push("P.genre_id="+filter_obj.cat_id)
            }
            if(filter_obj.author_id){
                params.push("B.author_id="+filter_obj.author_id)
            }
            if(filter_obj.publisher_id){
                params.push("B.publisher_id="+filter_obj.publisher_id)
            }
            if(params.length>0){
                query+=" WHERE "+ params.join(" AND ")
            }
        }
        return dbClient.query(query)
    }

    static getMerch(dbClient,filter_obj={category_id,manufacturer_id}){
        var query="SELECT * FROM Products P INNER JOIN Merch M on P.id=M.product_id"
        
        if(filter_obj!={}){
            var params=[]
            if(filter_obj.category_id){
                params.push("P.category_id="+filter_obj.category_id)
            }
            if(filter_obj.manufacturer_id){
                params.push("P.manufacturer_id="+filter_obj.manufacturer_id)
            }
            if(params.length>0){
                query+=" WHERE "+ params.join(" AND ")
            }
        }
        return dbClient.query(query)
    }

    static getBookById(dbClient,id){
        //By product id
        var query="SELECT * FROM Products P FULL JOIN Books B on B.product_id=P.id WHERE B.product_id="+id
        return dbClient.query(query)
    }
    static getMerchById(dbClient,id){
        //By product id
        var query="SELECT * FROM Products P FULL JOIN OtherProducts O on O.product_id=P.id WHERE O.product_id="+id
        return dbClient.query(query)
    }
    static getImages(dbClient,id){
        //By product id
        var query = "SELECT * FROM Images WHERE product_id="+id;
        return dbClient.query(query);
    }
    static getFromTable(dbClient,tableName=isRequired()){
        var query="SELECT * FROM "+tableName;
        return dbClient.query(query)
    }
    static getFromTableById(dbClient,tableName=isRequired(),id){
        if(!id) return new Promise((res,rej)=>{res.send("")})
        var query="SELECT * FROM "+tableName;
        query+=" WHERE id="+id;
        return dbClient.query(query)
    }


    static addBook(dbClient,{name,author_id,publisher_id,genre_id,description,price,quantity}){
        var queryProduct="INSERT INTO Products (name,price,quantity) VALUES ('"+name+"', "+price+", "+quantity+") RETURNING id";
        console.log(queryProduct)
        return dbClient.query(queryProduct).then(dbRes=>{
            var id = dbRes.rows[0]["id"]
            
            var queryBook = "INSERT INTO Books (product_id,author_id,publisher_id,genre_id,description) VALUES ("
            queryBook+=id+","+author_id+","+publisher_id+","+genre_id+",'"+description+"') RETURNING id";
            console.log(queryBook)
            return dbClient.query(queryBook);
        })

    }
    static addMerch(dbClient,{name,manufacturer_id,category_id,genre_id,description,price,quantity}){
        //TODO
    }
    static addToTable(dbClient,tableName=isRequired(),{name}){//ONLY FOR ENUM TABLES!
        //if table is NOT ENUM(has only 'id' and 'name' columns)
        //you should create a separate function

        var query="INSERT INTO "+tableName+" (name) VALUES ('" + name + "') RETURNING id"
        console.log(query)
        return dbClient.query(query);
    }
}
module.exports=Product

