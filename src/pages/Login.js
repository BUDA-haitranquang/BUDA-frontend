import React from 'react';
import SignInForm from '../components/signin/SignInForm';
import LogInPic from '../assets/login.jpg';
const containerStyle={
    display:'inline-flex',
    justifyContent:"space-evenly",
    flexDirection:"row",
    padding:'none',
    margin:'none',
    minHeight:'100vh'
}
const Login = () => {
    return (
        <div style={containerStyle}>
         <div style={{
             width:'100%',
             backgroundImage : `url(${LogInPic})`,
             backgroundRepeat:"no-repeat",
             backgroundSize:"100%",
        }}>
            
         </div>
         {/* #1976d2 */}
         <div style={{backgroundColor:'#1976d2 ',width:'100%'}}><SignInForm/></div>   
        </div>
    )
}

export default Login;