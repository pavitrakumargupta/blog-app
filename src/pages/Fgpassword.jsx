import React,{useState} from "react"; 
function Fgpassword(props){
    const [detail,setDetail]=useState({
        email:'',
        otp:'',
        password:'',
        confirm_password:''
    })
    var valid_email=props.validate_email
    var valid_otp=props.validate_otp

    const handleChange=(event)=>{
        const {name,value}= event.target;
        setDetail(prevValue=>{
            return{
            ...prevValue,
            [name]:value                 
            }})
        props.info(name,value)
      }
    const onclick=(event)=>{
        const name=event.target.name;
        props.onsubmit(name)
        event.preventDefault()
        
    }
    const password_display=()=>{
        return<>
            <input 
                type="password"
                name="password" 
                id="pswrd" 
                value={detail.password}
                // pattern="(?=.*\d)(?=.*?[#?!@$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                // title="your password must contain at least one  number and one uppercase and lowercase letter,and one special characters [#?!@$%^&*], and at least 6 or  more characters"
                placeholder="Password"
                autoComplete="off"
                required
                onChange={handleChange}
            />
            <input 
                type="password"
                name="confirm_password"
                id="pswrd"
                value={detail.confirm_password}
                placeholder="Confirm_Password"
                autoComplete="off"
                onChange={handleChange}
                required
            />
            <button name="change_password" onClick={onclick}>Change Password</button>
        </>
    }
    const otp_display=()=>{

        return<>
            <h3>Enter OTP sent on your email</h3>
            <input 
                type="text"
                placeholder="Enter OTP" 
                name="otp"
                onChange={handleChange}
                required
            />
            <button name='otp_check' onClick={onclick} >Confirm OTP</button>
        </>
    }
    const email_display=()=>{
        return <>
            <input 
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                value={detail.email}
                placeholder="Email"
                required
                name="email" 
                onChange={handleChange}
            />
            <button name="email_check" onClick={onclick}>Send OTP</button>
        </>
    }
    if(valid_otp){
        return password_display()
        
    }else if(valid_email){
        return otp_display()
    }else{
        return email_display()
    }
     
}
export default Fgpassword;