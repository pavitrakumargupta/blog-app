import React,{useEffect} from "react"; 
import axios from "axios"
import {article} from "./../utils/APIRoutes"
import ArticleWeb from '../pages/Article'
import {useNavigate} from "react-router-dom"

const App=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")==null){
            navigate("/login")}
    })
    if(localStorage.getItem("chat-app-user")==null){
        navigate("/login")
        return <></>
      }else{
    const getPosts=async(postType)=>{
        const detail={
            operation:"read",
            TypePost:postType
        }
        const {data}=await axios.post(article,detail)
        return data
    } 
        
    const handle_operation=async (operation,detailForm)=>{
        detailForm.operation=operation;
        const {data}=await axios.post(article,detailForm)
        await navigate("/")
    }
    return <ArticleWeb
        getPosts={getPosts}
        submitForm={handle_operation}
    />}
}
export default App;