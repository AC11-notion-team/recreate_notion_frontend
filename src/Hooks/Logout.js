import React from 'react'

export default function Logout(){
    localStorage.removeItem('zettel_user_token')
    localStorage.removeItem('zettel_user_id')
    localStorage.removeItem('currentPageId')
}