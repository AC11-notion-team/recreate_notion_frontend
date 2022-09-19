import React,{useState,useEffect} from 'react'
import GoogleLogin from '../GoogleLogin'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function LoginPage() {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  // 第一個state 記載 是否已經發給後端判斷email存不存在
  const [status, setstatus] = useState("init")
  const [submitBtn, setsubmitBtn] = useState("continue with email")
  let btn ={
    "init" : "continue with email",
    "register": "register",
    "unvertify":"please vertify",
    "login":"login",
    "third":"third",
  }
  useEffect(()=>{
    setsubmitBtn(btn[status]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status])

  async function testEmailExist(data){
    try{
      await axios({
        method:"get",
        url:`${baseUrl}/users/email_present.json`,
        params:{
          email:data.email
        }
      }).then((res)=>{
        if(res.data.status === "third"){
          setstatus("init")
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: '已於google登入註冊，請使用google登入',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }else{
          setstatus(res.data.status)
        }
      })
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'oops...',
        text: 'server wrong',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
  async function goToRigister(data){
    try{
      await axios({
        method:"post",
        url:`${baseUrl}/users`,
        params:{
          email:data.email,
          username: data.username,
          password: data.password
        }
      }).then((res)=>{
        setstatus("unvertify")
      })
    }catch(error){
      console.log(error);
    }
  }
  async function goToVertify(data){
    try{
      await axios({
        method:"get",
        url:`${baseUrl}/users/email_confirmed`,
        params:{
          email:data.email,
          username: data.username,
          password: data.password,
          confirm_token: data.confirm_token
        }
      }).then((res)=>{
        if(res.data.status==="login"){
          window.location.reload(false);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'passcode wrong',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
        setstatus(res.data.status)
      })
    }catch(error){
      console.log(error);
    }
  }
  async function goToLogin(data){
    try{
      await axios({
        method:"post",
        url:`${baseUrl}/users/login`,
        params:{
          email:data.email,
          password: data.password,
        }
      }).then((res)=>{
        if(res.data.status==="success"){
          localStorage.setItem("zettel_user_token", res.data.auth_token);
				  localStorage.setItem("zettel_user_id", res.data.user_id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been success login',
            showConfirmButton: false,
            timer: 1500
          })
          return navigate("/");
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '密碼錯了',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        setstatus(res.data.status)
      })
    }catch(error){
      console.log(error);
    }
  }

  const onSubmit = (data)=>{
    if (status==="init"){
      testEmailExist(data)
    }else if (status==="register"){
      setstatus("unvertify")
      goToRigister(data)
    }else if (status==="unvertify"){
      goToVertify(data)
    }else if(status==="login"){
      goToLogin(data)
    }else if(status==="third"){
      setstatus("init")
    }
  }
  
  return (
    <>
      <div className="flex items-center w-10 h-12 mt-6 ml-6 justify-items-start "><img src="/zittel1.png" alt="" />
        <span className="ml-2 text-xl font-medium">Zettel</span>
      </div>
      <div className="w-full mt-4 border-b-2 border-grey-100 "/>
       <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-6xl font-bold tracking-tight text-center text-gray-900 ">
              Log in
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <GoogleLogin />
            <div className="border-b-2 border-grey-100"/>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              { ((status==="init")||(status==="login")||(status==="register"))&&
                <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                
                <input
                {...register("email")}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              }

              { status==="register"   &&
                <div>
                <label htmlFor="username" className="sr-only">
                  UserName
                </label>
                
                <input
                {...register("username")}
                  id="username"
                  name="username"
                  type="text"
                  // autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="username"
                />
              </div>
              }
              
              {
                ((status==="register")||(status==="login")) && 
                <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div> 
              }
              {
                 status ==="unvertify" &&
                <div>
                <label htmlFor="confirm_token" className="sr-only">
                confirm_token
                </label>
                <input
                {...register("confirm_token")}
                  id="confirm_token"
                  name="confirm_token"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="請輸入passcode"
                />
              </div> 
              }
               
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-lg font-medium border border-transparent rounded-md group bg-rose-50 text-rose-500 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:bg-rose-50 focus:ring-offset-2"
              >
                {submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>  
  )
}
