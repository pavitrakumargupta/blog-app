import React,{useState} from "react";

function Avatars() {
  const [avatars,setAvatars]=useState([]);
  const [isloading,setLoading]=useState(true);
  const [selectedAvatar,setSelectedavatar]=useState(undefined);
 

  return <> 
    <div className="title-container">
                <h1>Pick an avatar as ayour profile pitchure</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return (
                            <div 
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
                }
            </div>
  </>
}

export default Avatars;
