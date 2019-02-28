import axios from "axios"
import config from "../../config.js"

let getTable = (tableName) => {
    return axios.get(config.API_URL + "/get" +tableName);
}
let addToTable = (tableName,name)=>{

    let data={name:name}
    return axios.post(config.API_URL+"/add"+tableName,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export default {
    getBooks(){
        return getTable("Books");
    },
    getBookByProductId(id){
        return axios.get(config.API_URL+"/getBookByProductId?id="+id);
    },
    addAuthor(name){
        return addToTable("Author",name);
    }
}