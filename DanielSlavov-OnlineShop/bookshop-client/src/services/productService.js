import axios from "axios"
import config from "../../config.js"

let getTable = (tableName) => {
    return axios.get(config.API_URL + "/get" +tableName);
}

export default {
    getBooks(){
        return getTable("Books");
    },
    getBookByProductId(id){
        return axios.get(config.API_URL+"/getBookByProductId?id="+id);
    }
}