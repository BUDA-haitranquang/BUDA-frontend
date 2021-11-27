import React,{useState,useRef} from 'react';
import { Box,Button,OutlinedInput,InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    root: {
        '& fieldset': {
            borderRadius: '25px',
            
          },
    }
})
const SignInForm = ()=>{
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const classes = useStyle();
    return(
        <Box sx={{display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
        }}>
             <OutlinedInput
                className={classes.root}
                value = {userName}
                onChange={e => setUserName(e.target.value)}
                id='username-input'
                type='text'
                placeholder='Username'
                startAdornment ={
                    <InputAdornment position='start'><PersonIcon/></InputAdornment>
                }
            />
            <OutlinedInput
                className={classes.root}
                value={password}
                onChange={e => setPassword(e.target.value)}
                id = 'password-input'
                type='password'
                placeholder='Password'
                startAdornment ={
                    <InputAdornment position='start'><LockIcon/></InputAdornment>
                }
            />
        </Box>
    )
}

export default SignInForm;