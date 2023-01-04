import React  from "react"; 
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import Regis from "../pages/Register";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios" 
import {registerRoute} from "../utils/APIRoutes"

function App() {
  const navigate=useNavigate()
  const toast_style={
    position:"bottom-right",
    autoClose:3000, 
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }
 
  const handlesubmit=async(new_user,event) =>{
      const {data}=await axios.post(registerRoute,new_user)
      if(data.status===false){
        toast.error(data.msg,toast_style)
      }
      else if(data.updated==='password'){

        await navigate("/login")
      }
      return data.status
  }
  
    return  <>
    <FormContainer>    
    <Regis
      onsubmit={handlesubmit}
    />
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
      overflow:auto;
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
      select{
        background-color:#00000076;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        padding:0.5rem;
        width:43%;
        color:grey;
        margin:0.5rem;
        font-size:1rem;
        &:focus{
          border:0.1rem solid #997af0;
          outline:none;
        }
        option{
          background-color:black;
          color:white; 
        }
      }
      h3{color:white}
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
export default App;
