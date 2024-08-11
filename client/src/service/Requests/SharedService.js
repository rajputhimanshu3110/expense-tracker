import APIService from "../APIService"
import Urls from "../Urls";

const SharedService = {
    getAll: function (param, cb){
        APIService.post(Urls.getShared,param,cb);
    }
}

export default SharedService;