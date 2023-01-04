import React ,{useState} from "react"; 
import profile from '../assets/userimage.png'
const App= (props)=>{
    const [postDetail,setPostdetail]=useState()
    const [editpost,setEditpost]=useState(false)
    const posts=props.posts
    const [Like,setLike]=useState('https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png')
    const [clicked,setclick]= useState(false) 

    const like_handle=()=>{
        clicked?setclick(false):setclick(true)
        if(clicked){
            setLike('https://img.favpng.com/10/8/7/like-button-social-media-image-facebook-messenger-png-favpng-YkquKiF4ePG3tMC0eT3hxUfgS.jpg')
        }else{
            setLike('https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png')
        }
    } 
    const handlePostFormChange=(event)=>{
        const {name,value}=event.target
        setPostdetail(prevValue=>{
            return{...prevValue,[name]:value}
        })
    }

    const editPost=(values)=>{
        return  <form style={{"zIndex":"2","position":"fixed","backgroundColor":"white","width":"300px","height":'500px',"top":"20vh","left":"20vw","borderRadius":"20px","alignItems":"center","justifyContent":"center","display":"flex","flexDirection":"column","gap":"2rem" ,"border":"solid 1px black"}}>
        <button  type="button" onClick={()=>{setEditpost(false)}} style={{"marginLeft":"90%","backgroundColor":"red"}} class="btn-close btn-close-black" aria-label="Close"></button>
          <select value={postDetail.TypePost} onChange={handlePostFormChange}  style={{"borderRadius":"20px"}}  name="TypePost"   id="">
              <option value="" disabled selected>Type of post</option>
              <option>Article</option>
              <option >Education</option>
              <option >meeting</option>
              <option >Job</option>
          </select>
          <input value={postDetail.imageLink} onChange={handlePostFormChange} name="imageLink" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="image url" />

          <input value={postDetail.heading}  onChange={handlePostFormChange} name="heading" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="heading" />

          <input value={postDetail.subheading} onChange={handlePostFormChange} name="subheading" style={{"width":"90%","height":"15%","borderRadius":"5px"}} type="text" placeholder="Sub Heading" />
          <button onClick={updatePost}   className="btn btn-primary">update</button>
      </form>
    }
    const deletePost=()=>{
        props.delete(postDetail,"delete")
    }
    const updatePost=()=>{
        props.update(postDetail,"edit")
    }
 
    return <ul style={{"marginBottom":"50px","width": "50vw","marginLeft":"1vw"}} className="list-group list-group-flush" >{posts.map((key)=>(
         <li className="list-group-item">
            <div className="card">
                <img src={key.imageLink} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{key.TypePost}</h5>
                    <h3 className="card-title">{key.heading}</h3>
                    <p className="card-text">{key.subheading}</p> 
                    <div style={{"display":"flex"}}>
                        <img style={{"height":"50px","borderRadius":"10px","marginRight":"10px"}} src={profile} alt="" />
                        <span>
                            <h5 style={{"width":"100%"}}>{key.name}</h5>
                            <p>1.4k views</p>
                        </span>
                    </div>
                    <div style={{"height":"50px","display":"flex","gap":"45%","margin-bottom":"2%"}}>
                        <img onClick={like_handle} src={Like}  alt="" srcset="" />
                        <button style={{"borderRadius":"10px","width":"40%"}}>Comment</button>
                    </div>
                    <a style={{"width":"100%", "right":"5px"}} href="http://" className="btn btn-primary">Share</a>
                </div>
                <div style={{"display":"flex","gap":"59.3%"}}>
             <button className="btn btn-primary" onClick={()=>{setPostdetail(key)
             setEditpost(true)
             console.log(true)}}>Edit Post</button>
             <button onClick={()=>{setPostdetail(key)
             deletePost()}} className="btn btn-dark">Delete Post</button>
            </div> 
            {editpost?editPost():<></>}
            </div>
        </li>
))}</ul>
    
} 
export default App;