import React ,{useState,useEffect} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from "../assets/logo.webp"
import ComputerImage from "../assets/computer_image.webp"
import userimage from "../assets/userimage.png"
import Posts from './Posts'
import {useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

 
function Article(props){
    const user =JSON.parse(localStorage.getItem('chat-app-user'))
    const toast_style={
        position:"bottom-right",
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      }
    const [posts,setposts]=useState()
    const [editpost,setEditpost]=useState(false)
    const [postDetail,setPostdetail]=useState({
        TypePost:"",
        heading: "",
        subheading: "",
        imageLink:"",
        operation: "",
        name:user.username
    })

    const [Like,setLike]=useState('https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png')
    const [createPost,setcreatepost]= useState(false)
    const [groupJoined,setgroupjoined]=useState(false)
    const [follow,setFollow]=useState("follow")

    const handlejoin=(event)=>{
        if(user){
            !groupJoined?setgroupjoined(true):setgroupjoined(false)
        }
        event.preventDefault()
    }
    const Create_post=()=>{ 
        return  <form style={{"position":"fixed","backgroundColor":"white","width":"300px","height":'500px',"top":"20vh","left":"20vw","borderRadius":"20px","alignItems":"center","justifyContent":"center","display":"flex","flexDirection":"column","gap":"2rem" ,"border":"solid 1px black"}}>
        <button type="button" onClick={()=>{setcreatepost(false)}} style={{"marginLeft":"90%","backgroundColor":"red"}} class="btn-close btn-close-black" aria-label="Close"></button>
          <select onChange={handlePostFormChange}  style={{"borderRadius":"20px"}}  name="TypePost"   id="">
              <option value="" disabled selected>Type of post</option>
              <option>article</option>
              <option >Education</option>
              <option >meeting</option>
              <option >Job</option>
          </select>
          <input  onChange={handlePostFormChange} name="imageLink" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="image url" />

          <input  onChange={handlePostFormChange} name="heading" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="heading" />

          <input  onChange={handlePostFormChange} name="subheading" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="Sub Heading" />
          <button onClick={submitdetail}  className="btn btn-primary">Post</button>
      </form>
    }
    const submitdetail=(event)=>{
        handleSubmitPostform(postDetail,"createPost")
        event.preventDefault()
    }
    const handlePostFormChange=(event)=>{
        const {name,value}=event.target
        setPostdetail(prevValue=>{
            return{...prevValue,[name]:value}
        })
    }
    const handleSubmitPostform=async (detail,task,event)=>{
        if(detail.heading===''|| detail.TypePost===''){
            toast.error("Heading and type of post is must",toast_style)
        }else{ 
            setcreatepost(false)
            toast.error("changes will occur on refresh",toast_style)
            await props.submitForm(task,detail)
        }
        navigate("/")

    }

    const handlePost= async (event)=>{
        const name=event.target.name;
        setposts(await props.getPosts(name))
        console.log(await posts);
    }
    const navigate=useNavigate()
    const deleteLocalstorage=()=>{
        localStorage.clear()
        navigate('/login')
      }

    return <>
         <nav className="navbar bg-light">
            <div className="container-fluid">
                <img style={{"width":"10vw"}}
             src={logo} alt="" /> 
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search " aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                
                {user?<div style={{"marginLeft":"-2%"}}>
                    <img style={{"height":"20px","borderRadius":"10px","marginRight":"10px"}} src={userimage} alt="" />
                            <span>
                                <p>{user.username}</p>
                            </span>
                            <button onClick={deleteLocalstorage} className="btn btn-dark">LogOut</button>
                        </div>:
                 <h6>Create account <a href="/login">!Its free</a></h6> }
            </div>
            </nav>
        <div  className="card" style={{"position":"absolute","width": "100vw","height":"90vh","overflowY":"scroll"}}>
            <div>
                <img src={ComputerImage}  className="card-img-top" alt="..."/>
                <div style={{ "color":"white","position":"relative","marginLeft":"5%","bottom":"80%" ,}}>
                    <h1   className="card-title" >Computer Engineering</h1>
                    <p style={{"fontSize":"20px"} }className="card-text">142,765 Computer Engineers follow this</p>
                </div>
            </div>
            <div>
                <div style={{"display":"flex" ,"gap":"2%","marginLeft":"1%","marginTop":"-2%","width":"40wh"}}  name="" id="">
                    <button name="all" onClick={handlePost}>All Post</button>
                    <button name="article" onClick={handlePost}>Article</button>
                    <button name="Education" onClick={handlePost}>Education</button>
                    <button name="meeting" onClick={handlePost}>Meeting</button>
                    <button name="Job" onClick={handlePost}>Job</button>
                </div>
                <hr />
                {posts?<Posts
                    posts={posts}
                    update={handleSubmitPostform}
                    delete={handleSubmitPostform}
                />:<></>}
                
            </div>
            <div style={{"width":"45.5vw","left":"53%","position":
            "absolute","marginTop":"70%", "backgroundColor":"white"}}>
                <div style={{"display":"flex","gap":"0.5rem","marginLeft":"36%"}} >
                        <button onClick={()=>{setcreatepost(true)}} className="btn btn-primary">
                        Create Post
                        </button>
                        {createPost?Create_post():<></>}
                        <button onClick={handlejoin} className="btn btn-dark">{groupJoined?"leave Group":"join Group"}</button>
                </div>
                <div style={{"marginTop":"20%" }}>
                    <input id="location" style={{"borderStyle":"none", "borderBottom": "1px solid " }} type="address" placeholder="🖊Enter your Location"  />
                    <p>ⓘ Your location  will   help us  serve better  and extend a personalised experience.</p>
                </div>
                {!groupJoined?<> </>: 
                <div style={{"marginTop":"10%"}}>
                    <h5 style={{"fontSize":"80%"}}>👍Recommended Groups</h5>
                    <div style={{"marginTop":"5%","display":"flex"}}>
                            <img style={{"height":"20px","borderRadius":"10px","marginRight":"10px"}} src={userimage} alt="" />
                            <span>
                                <p>Leisure</p>
                            </span>
                            <a style={{"position":"absolute","border":"solid 0.5px grey","right":"0px"}} href="http://" className="btn">{follow}</a>
                        </div>
                        <div style={{"marginTop":"5%","display":"flex"}}>
                            <img style={{"height":"20px","borderRadius":"10px","marginRight":"10px"}} src={userimage} alt="" />
                            <span>
                                <p>Leisure</p>
                            </span>
                            <a style={{"position":"absolute","border":"solid 0.5px grey","right":"0px"}} href="http://" className="btn">{follow}</a>
                        </div>
                        <div style={{"marginTop":"5%","display":"flex"}}>
                            <img style={{"height":"20px","borderRadius":"10px","marginRight":"10px"}} src={userimage} alt="" />
                            <span>
                                <p>Leisure</p>
                            </span>
                            <a style={{"position":"absolute","border":"solid 0.5px grey","right":"0px"}} href="http://" className="btn">{follow}</a>
                        </div>
                        <div style={{"marginTop":"5%","display":"flex"}}>
                            <img style={{"height":"20px","borderRadius":"10px","marginRight":"10px"}} src={userimage} alt="" />
                            <span>
                                <p>Leisure</p>
                            </span>
                            <a style={{"position":"absolute","border":"solid 0.5px grey","right":"0px"}} href="http://" className="btn">{follow}</a>
                        </div>
                </div>
            }
            </div>        
        </div>  
        <ToastContainer/>
    </>
}

export default Article;