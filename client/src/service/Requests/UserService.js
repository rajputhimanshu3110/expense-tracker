import React from 'react'
import APIService from '../APIService'
import Urls from '../Urls'
import SessionService from '../SessionService';
import Keys from '../Keys';

const UserService = {
  getLogin : function (param,cb){
    //console.log(Urls.login);
    APIService.post(Urls.login,param,(res)=>{
        if(res.success){  
            SessionService.set.loggedInUser(res.data.user);
        }
        cb(res);
    });
  },
  logOut : function (){
    localStorage.removeItem(Keys.loggedInUser);
    localStorage.removeItem(Keys.userToken);
  },
  changePassword: function(param,cb){
    APIService.post(Urls.changePassword, param, (res) => {
      cb(res);
    });
  }
}

export default UserService
