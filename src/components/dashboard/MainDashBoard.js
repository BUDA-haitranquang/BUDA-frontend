import {Grid,Box,Button} from '@mui/material';
import LChart from './Charts/LineCharts';
import BChart from './Charts/BarCharts';
import react,{useState} from 'react';
const MainDashBoard =()=>{
    const [chart,setChart] = useState(0);
    return(
        <Grid container spacing={2} display='flex' flexDirection='row' sx={{width:'100%'}}>
            <Grid item sm={12} md={8}  sx={{height:'90vh',width:'100%',display:'flex',flexDirection:'column'}}>
                <Box sx={{width:'100%',paddingBottom:'10px'}} item display='flex' flexDirection='flex' justifyContent='space-between' >
                    <Box >
                        <h1 style={{margin:'10px 0 0 30px '}}>
                            {chart%2===0?'Line Chart': 'Bar Chart'}
                        </h1>
                    </Box>
                    <Box>
                        <Button 
                            sx={{height:'100%',margin:'10px 20px 0 0'}}
                            onClick={e=>  setChart(chart + 1)}>
                            {chart%2===0?'Line Chart': 'Bar Chart'}
                        </Button>
                    </Box>
                </Box> 
                {chart%2===0?<LChart/>:<BChart/>}
            </Grid>
            <Grid item xs display='flex' flexDirection='column' sx={{marginTop:'70px'}} rowSpacing={2} >
            <Grid item xs>hi </Grid>
            <Grid item xs> hi</Grid>
            <Grid item xs> hi</Grid> 
            </Grid>
        </Grid>
    )
}

export default MainDashBoard;