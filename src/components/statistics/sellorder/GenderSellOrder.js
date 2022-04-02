import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box,Toolbar,Grid } from "@mui/material";
import BudaLegend from "../../../buda-components/charts/BudaLegend";
import BudaPieChart from "../../../buda-components/charts/BudaPieChart";
import { LOAD_TOTAL_SPEND_GENDER_BY_USER } from "../../../graphQl/statistics/statisticQueries";
// import { LOAD_TOTAL_SPEND_GENDER_THIS_MONTH_BY_USER } from "../../../graphQl/statistics/statisticQueries";
const GenderSellOrder = ()=>{
    
    const { error: genderError, loading: genderLoading, data: genderData } = useQuery(LOAD_TOTAL_SPEND_GENDER_BY_USER );
    // const {error: genderThisMonthError,loading: genderThisMonthLoading,data: genderThisMonthGender} = useQuery(LOAD_TOTAL_SPEND_GENDER_THIS_MONTH_BY_USER);
    const [gender,setGender] = useState([]);
    const COLORSGENDER = ['#AEAEAE', '#5DD6F4','#ffc0cb'];
    useEffect(() => {
        async function fetchData() { 
            if(genderData){ 
            let chartData = [];
            await genderData.totalSpendGenderByUser.forEach(e => chartData.push({name: e.gender,value : e.totalSpend}))
            setGender(chartData);
            } 
        }
        fetchData();
      }, [genderData]);
    
      return(
        <Grid container sx = {{width:'100%',height:'50vh'}} display = 'flex' flexWrap='wrap'>
        <Grid items xs ={6 } 
              display='flex'
              flexDirection='column' 
              alignItems='center'
              justifyContent='center'
        >
        
        <BudaPieChart legend = {false} data = {gender} colors = {COLORSGENDER} width='100%' height={500}/>
        </Grid>
        <Grid item xs = {6} display='flex' justifyContent='center'>
            <Box>
            <Toolbar />
            <Box>{}</Box>
            <h1> Sell order by gender</h1>
            <BudaLegend data = {gender} colors = {COLORSGENDER} style={{display:'flex',flexDirection:'column',width:"100%"}}/>
            </Box>
        </Grid>
    </Grid>
      )
}
export default GenderSellOrder;