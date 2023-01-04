import React,{useState} from "react"; 
import Logo from "../assets/logo.png"
import {useNavigate} from "react-router-dom"
function Login(props) {
  const navigate=useNavigate()
  const [inputValues,setinputValues]=useState({
    email:"",
    password:"",
  })
  const handleChange=(event)=>{
    const {name,value}=event.target
    setinputValues(prevValue=>{
      return{
        ...prevValue,
        [name]:value                 
        }})
  };

  function submitForm(event) {
    props.onSubmit(inputValues,event);
  }
  return  <>
    <form onSubmit={submitForm}>
      <div className="brand">
        <img src={Logo} alt="" />
        <h1>Pamuru</h1>
      </div>
       
      <input 
        type="email"
        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
        placeholder="Email"
        autocomplete="off"
        required
        name="email" 
        onChange={handleChange}
      />
      <input 
        type="password"
        name="password"
        id="pswrd"
        // pattern="(?=.*\d)(?=.*?[#?!@$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}"
        // title="your password must contain at least one  number and one uppercase and lowercase letter,and one special characters [#?!@$%^&*], and at least 6 or  more characters"
        placeholder="Password"
        autocomplete="off"
        required
        onChange={handleChange}
      />
        <button type="submit">Login</button>
        <span>Don't have an Account ?<a style={{"color":"blue"}} onClick={()=>{navigate('/register')}}> Sign-up </a> </span>
        <span style={{"alignContent":"center"}}><a style={{"color":"blue"}}  onClick={()=>{navigate('/authentication')}}  >Forgot password ?</a></span>
      </form>
  </>
}

  
export default Login;
