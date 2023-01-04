import React,{useState} from "react"; 
import Logo from "../assets/logo.png"
import Option from "./Option";
import Fgpassword from "./Fgpassword";
import { toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from "react-router-dom"

function Register(props) {
  const navigate=useNavigate()
  const [authentication,setAuthentication]=useState({
    username:false,
    email:false,
    otp:false
  })
  const [inputValues,setinputValues]=useState({
    username:"",
    email:"",
    phnNo:"",
    course:"",
    branch:"",
    semester:"",
    password:"",
    confirm_password:"",
    otp:""
  }) 
  const toast_style={
    position:"bottom-right",
    autoClose:3000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }
  const handleChange=(event)=>{
    const {name,value}=event.target
    setinputValues(prevValue=>{
      return{
        ...prevValue,
        [name]:value                 
        }})
  };
  const SetChange=(name,value)=>{
    setinputValues(prevValue=>{
      return{
        ...prevValue,
        [name]:value                 
        }})
  }
  
  async function  submitForm(name,event) {
    if(await handle_validation()){
      if(await props.onsubmit(inputValues)){
        if(name==='email_check'){
          setAuthentication(prevValue=>{
            return{...prevValue,
            'email':true}})
        }else if(name==='otp_check'){
          setAuthentication(prevValue=>{ 
            return{...prevValue,
            'otp':true}})
        }
      }     
    }else{
      event.preventDefault()
    }
  }
  const handle_validation=()=>{
    if(inputValues.username.length<2){
      toast.error("username should be greater than 3 character",toast_style)
    }else if(inputValues.password!==inputValues.confirm_password){
      toast.error("Password and confirm password should match",toast_style)
    }else if(inputValues.phnNo.length<9){
      toast.error("Invalid! phone no",toast_style)
    }else if(inputValues.branch===""){
      toast.error("Branch is required",toast_style)
    }else if(inputValues.course===""){
      toast.error("Course is required",toast_style)
    }else if(inputValues.semester===""){
      toast.error("Semester is required",toast_style)
    }
    else{
      return true
    }

    return false
  }

  function courseDetail(detail){
    inputValues.course=detail.course;
    inputValues.branch=detail.branch;
  }
  
  function next(event){
    if(handle_validation()){
      setAuthentication(prevValue=>{
        return{...prevValue,'username':true}
      })
    }else{
      event.preventDefault()
    }
  }
  function back(event){
    if(authentication.otp){
      setAuthentication(prevValue=>{return{...prevValue,'otp':false,'email': false}})
    }else if(authentication.email){
      setAuthentication(prevValue=>{return{...prevValue,'email': false}})
    }else{
      setAuthentication(()=>{return{ 'username': false}})
      setinputValues(prevValue=>{
        return{
         ...prevValue,
         'email':""
        } 
       })
    }
    setinputValues(prevValue=>{
     return{
      ...prevValue,
      'otp':"",
      "password":"",
      "confirm_password":""
     } 
    })
    event.preventDefault()
  }
  function Authentication(){
    return <Fgpassword
      onsubmit={submitForm}
      info={SetChange}
      validate_email={authentication.email}
      validate_otp={authentication.otp}
    />
  }
   
  return  <>
    <form>
    {authentication.username?<button onClick={back}>← Back</button>:<h3></h3>}
      <div className="brand">
        <img src={Logo} alt="" />
        <h1>Pamuru</h1>
      </div>
      { authentication.username?Authentication():(<>
  
      <input 
        type="text"
        pattern="[A-Za-z]{2-30}"
        placeholder="Username"
        // autoComplete="off"
        value={inputValues.username}
        name="username"
        onChange={handleChange}
      />
      <input
        id="mobile"
        type="tel"
        pattern="[0-9]{10}"
        placeholder="Phone Number"
        // autoComplete="off"
        value={inputValues.phnNo}
        name="phnNo"
        onChange={handleChange}
      />

       <Option
          optionDetail={courseDetail}
       />
      <input
        type="text"
        pattern="[1-8]"
        placeholder="Semester"
        // autoComplete="off"
        value={inputValues.semester}
        name="semester"
        onChange={handleChange}
        />
        <button onClick={next}>Next</button>
        </>)}
        <span>Already have an Account ?<a style={{"color":"blue"}} onClick={()=>{navigate('/login')}}> Login </a> </span>
      </form>
      
  </>
}

  
export default Register;
