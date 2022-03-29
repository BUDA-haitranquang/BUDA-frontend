import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import * as React from 'react';
import { borderRadius } from '@mui/system';
import { auto } from '@popperjs/core';

const useStyeles = makeStyles({
  btn1: {
    padding: 10,
    height: 60,
    fontSize: 23,
    width: 150,
   // backgroundColor: '#007bff',
    color: '#42494F',
    borderRadius: 10,
    marginRight: 50,
    borderRadius: 29,
  },
  btn2: {
    padding: 10,
    height: 60,
    fontSize: 23,
    width: 150,
    marginLeft: 50,
   // backgroundColor: '#007bff',
    color: '#42494F',
    borderRadius: 29,
  },
  headding: {
    fontSize: 111,
    fontWeight: 'bold',
    color: '#444444',
    paddingBottom: 10,
    fontFamily: 'Sans-serif',
    textShadow: '2px 4px 5px #6E6E6E',
  }
})

const Error = () => {
const history=useHistory();
const classes = useStyeles();
    return (
      
      <ThemeProvider>
        
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '30%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          marginTop: 145,
          paddingTop: 15,
          height: 350,
          width: 800,
          border: '1px outset black',
          boxShadow: '0px 10px 10px -10px #5D6572',
          borderRadius: 10,
        }}
        >
        <div className={classes.headding}><b>404</b> </div>
        <div style={{fontSize:35,paddingBottom:10,fontFamily: 'monospace',color: '007bff',}}><b>Oops! - PAGE NOT FOUND</b> </div>
        <Typography variant='h6' gutterBottom paddingBottom='10' color='#42494F'>Sorry, an error has occured, Tat ca la tai thang Tran Quang Hai </Typography>
        <div style={{
          paddingTop: 25,
        }}> 
          <button onClick={()=> history.push(`/dashboard/buy`)} className={classes.btn1}>GO HOME</button>
          <button onClick={()=> history.push(`/ingredient`)} className={classes.btn2}>GO BACK</button>
        </div>
        </div>   
        
        </ThemeProvider>
    )
}
export default Error;

