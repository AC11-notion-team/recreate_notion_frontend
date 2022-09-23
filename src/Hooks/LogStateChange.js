import React from 'react'

function Logout(){
    localStorage.removeItem('zettel_user_token')
    localStorage.removeItem('zettel_user_id')
    localStorage.removeItem('currentPageId')
}

function Login(token, user_id){
    localStorage.setItem("zettel_user_token", token);
    localStorage.setItem("zettel_user_id", user_id);
    if (localStorage.getItem("currentPageId")){
        localStorage.removeItem("currentPageId")
    }
}
export {Logout, Login} 