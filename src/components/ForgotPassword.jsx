import React,{useState} from "react"; 
import Logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom"
import styled from "styled-components";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {forgotPasswordRoute} from "../utils/APIRoutes";
import axios from "axios";
import Fgpassword from "../pages/Fgpassword";
function Forgotpass(){
  const[validate,setValidate]=useState({
    email:false,
    otp:false,
  })
  const [detail,setDetail]=useState({
    email:'',
    otp:'',
    password:'',
    confirm_password:''
})
  const navigate=useNavigate();
  const toast_style={
    position:"bottom-right",
    autoClose:3000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }


  const onclick=async(name)=>{
    if(name==='email_check'){
      if(handle_validation(detail)){
        const {data}=await axios.post(forgotPasswordRoute,{detail:detail})
        toast.error(data.status)
        if(data.status===false){
          toast.error(data.msg,toast_style)
        }else{
          setValidate(()=>{
            return {'email':true}
          })
        }
        } 
    }else if(name==='otp_check'){
      const {data}=await axios.post(forgotPasswordRoute,{detail:detail})
      if(data.status===false){
        toast.error(data.msg,toast_style)
      }
      else{
        setValidate(()=>{
          return{'otp':true}
        })
      }
    }else{
      if(handle_validation(detail)){
      const {data}=await axios.post(forgotPasswordRoute,{detail:detail})
      if(data.status===false){
        toast.error(data.msg,toast_style)
      }
      else{
        navigate('/')
      }
    }
  }
  }

  const handle_validation=(detail)=>{
    if(detail.email.length<1){
      toast.error("Email is required to reset the password",toast_style)
      return false
    }if(detail.password!==detail.confirm_password){
      toast.error("password and confirm_password should match",toast_style)
      return false
      }
      return true
  }
  const change=(name,value)=>{
    setDetail(prevValue=>{
        return{
        ...prevValue,
        [name]:value                 
        }})
  }

  return <>
    <Container>
    <div className="form">
      <div className="brand">
        <img src={Logo} alt="" />
        <h1>Pamuru</h1>
      </div>
      <Fgpassword
        onsubmit={onclick}
        validate_email={validate.email}
        validate_otp={validate.otp}
        info={change}
      />
    </div>
    </Container>
    <ToastContainer/>
  </>
}

const Container=styled.div` 
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  background-image: url('./black-orchid.png');

  .form{
    gap:2rem;
    background-color:#00000076;
    padding:3rem 5rem;
    display:flex;
    flex-direction:column;
    gap:2rem;
    padding:3rem 5rem;
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
    }
    }
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
    h3{
      color:white
    }
  }
`
export default Forgotpass;