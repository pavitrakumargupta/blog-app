import React,{useEffect} from "react"; 
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import Log from "../pages/Login";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {loginRoute} from "./../utils/APIRoutes"
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Login() {
  const navigate=useNavigate();

  const toast_style={
    position:"bottom-right",
    autoClose:3000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  })

  const handlesubmit=async(new_user,event) =>{
    event.preventDefault();

    if(handle_validation(new_user)){
      const {data}=await axios.post(loginRoute,new_user)

      toast.error(data.status)
      if(data.status===false){
        toast.error(data.msg,toast_style)
      }else{
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
        navigate("/")
      }
    } 
  }

  const handle_validation=(user)=>{
    
    if(user.password==="" &&user.email.length<1){
      toast.error("email and password is required",toast_style)
      return false
    } 
      return true
 
  }
 

    return  <>
    <FormContainer> 
         <Log 
         onSubmit={handlesubmit}/>
        </FormContainer>
        <ToastContainer/>
    </>
}

  
const FormContainer=styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  background-image: url('./black-orchid.png');
  .brand{
    display: flex;
    align-item:center;
    gap:1rem;
    justify-content:center;
   
    img{
      height:3rem;
    }
    h1{
      color:white
    }}
    form{
      display:flex;
      flex-direction:column;
      gap:2rem;
      background-color:#00000076;
      padding:3rem 5rem;
      overflow-y:auto;
      input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
          border:0.1rem solid #997af0;
          outline:none;
        }
      }
      button{
        background-color:#997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        text-transition:uppercase;
        &:hover{
          background-color:#4e0eff;
        }
      }
      span{
          color: rgb(135, 138, 140);
         }
    }
  
`;
export default Login;
