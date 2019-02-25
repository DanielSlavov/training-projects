class Product{
    constructor(obj){
        this.id=obj.id
        this.name=obj.name
        this.manufacturer_id=obj.manufacturer_id
        this.subcategory_id=obj.subcategory_id
        this.supplier_id=obj.supplier_id
        this.description=obj.description
        this.price=obj.price
        this.quantity=obj.quantity
    }
    
    static getProduct(dbClient,cat_id,subcat_id,man_id){
        var query="SELECT * from Products "
        var params=[]
        
        if(cat_id){
            params.push("S.category_id="+cat_id)
        }
        if(subcat_id){
            params.push("S.id="+subcat_id)
        }
        if(man_id){
            params.push("P.manufacturer_id="+man_id)
        }
        if(params.length>0){
            query+="P INNER JOIN subcategories S on P.subcategory_id=S.id WHERE "+ params.join(" AND ")
        }
        return dbClient.query(query)
        //return query
    }

}

class Category{
    constructor(obj){
        this.id=obj.id
        this.name=obj.name
    }
    static getId(dbClient,categoryName){
        if(!categoryName) return false
        var query="Select ID from Categories WHERE name="+categoryName
        return dbClient.query(query)
    }
}
module.exports.Product=Product
module.exports.Category=Category
