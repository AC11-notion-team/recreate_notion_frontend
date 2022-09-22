import React,{useState,useEffect} from 'react'
import GoogleLogin from '../GoogleLogin'
import FirstPartyLogin from './FirstPartyLogin'

export default function LoginPage() {
  
  return (
    <>
      <a href='/'>
        <div className="flex items-center justify-items-start mt-6 ml-6 h-12 w-10 ">
          <img src="/zettel.png" alt="" />
          <span className="text-xl font-medium ml-2">Zettel</span>
        </div>
      </a>
      <div className="w-full mt-4 border-b-2  border-grey-100 "/>
       <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className=" text-center text-6xl font-bold tracking-tight text-gray-900">
              Log in
            </h2>
          </div>
          <GoogleLogin />
          <div className=" border-b-2  border-grey-100  "/>
          <FirstPartyLogin />
        </div>
      </div>
    </>  
  )
}
