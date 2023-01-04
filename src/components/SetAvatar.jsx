import React,{useState,useEffect} from "react"; 
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import loader from "../assets/loader.gif"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {setAvatarRoute} from "../utils/APIRoutes"
import { Buffer } from "buffer";
// import Avatars from "../pages/Avatars"


 
function SetAvatar(){
    const api="https://api.multiavatar.com/45678945";
    const navigate=useNavigate();
   

    const [avatars,setAvatars]=useState([]);
    const [isloading,setLoading]=useState(true);
    const [selectedAvatar,setSelectedavatar]=useState(undefined);

    const toast_style={
        position:"bottom-right",
        autoClose:3000,
        pauseOnHover:true, 
        draggable:true,
        theme:"dark"
    };  
    
    useEffect(()=>{
        async function naviigate(){
            const user=await JSON.parse(localStorage.getItem("chat-app-user"));
            if(localStorage.getItem("chat-app-user")===null){
            navigate("/login")
            }else if (user.isAvatarImageset){
                navigate("/")
            }
        }
        naviigate()
      })
       
    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined){
            toast.error("plaease select an avatar",toast_style)
        }else{
            const user=await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar],
            });
            if(!data.isSet){
                user.isAvatarImageset=true;
                user.avatarImage=await data.image;
                await localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate('/')
            }else{
                toast.error("error setting avatar. please try again",toast_style)
            } 
        }   
    };
    // localStorage.setItem('referesh',0)
    var i=0;
    useEffect(()=>{  
        async function fetchdata(){
            try {
                const data=[];
            for(let i=0;i<4;i++){
                const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                const buffer= new Buffer(image.data);
                data.push(buffer.toString("base64"))
            }
            setAvatars(data);
            setLoading(false)
            } catch (error) {
                setTimeout(()=>{fetchdata()},60000)
            }
        } 
        i<1?i++:fetchdata()
    })

    return( <>
    {   isloading?<Container>
        <img src={loader} alt="loading"  className="loader"/>
         </Container>:(
        <Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">{
            avatars.map((avatar,index)=>{
                return (
                     
                <div  
                    key={index}
                    className={`avatar ${selectedAvatar===index?"selected":""}`}>
                    <img 
                        src={`data:image/svg+xml;base64,${avatar}`} 
                        alt="avatar" 
                        onClick={()=>
                        setSelectedavatar(index)} 
                    />
                </div>
                )
            })
        }</div>
        <button className="submitbtn" onClick={setProfilePicture}>Set as profile picture</button>
        </Container>)}
        <ToastContainer/>
    </>) 
} 
const Container=styled.div`
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      gap:3rem;
      background-color:#131324;
      height:100vh;
      width:100vw;
      .loader{
        max-inline-size:100%;
      } 
      .title-container{
        h1{
            color:white;
        }
      }
      .avatars{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5 ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff;
        }}
        .submitbtn{
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
      

`;

export default SetAvatar; 