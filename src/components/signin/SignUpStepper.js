import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { makeStyles } from '@mui/styles';
import { StepConnector } from '@mui/material';
const steps = [
  'User Name',
  'Email',
  'Password',
];

const useStyle = makeStyles({
  stepper:{
    '&.MuiStepper-root':{
      backgroundColor:'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    }
  },

  connector:{
    '&.MuiStepConnector-active':{
      backgroundColor:'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    },
    '&.MuiStepConnector-completed':{
      color:'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    }
  },

  step:{
    "&.MuiStepLabel-root": {
      color: "#fff",
      width: "80%",
      borderRadius: 20,
      border: "1px solid #fff",

    },
    '&.MuiStepLabel-iconContainer':{
      backgroundColor:'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    },
    "&.MuiStepLabel-iconContainer-completed":{
      backgroundColor:'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    }
  }
}) 
// const ColorlibConnector = styled(StepConnector)(()=>({
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//     },
//   }
// }))

const  SignUpStepper = ({stepper}) => {
  const classes = useStyle();
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper className={classes.stepper} activeStep={stepper} alternativeLabel connector={<StepConnector className={classes.connector}/>}>
        {steps.map((label) => (
          <Step key={label} className={classes.step} >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default SignUpStepper;