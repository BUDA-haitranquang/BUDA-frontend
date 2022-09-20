import { gql } from "@apollo/client";

export const LOAD_BUSINESS_OVERALL_30_DAY = gql`
query {
    businessOverallXDays(X:30){
        timePeriod
        revenue
        expense
        profit
    }
}`

export const LOAD_BUSINESS_OVERALL_EVERY_WEEK = gql`
query {
    businessOverallEveryWeek{
        timePeriod
        revenue
        expense
        profit
    }
}`

export const LOAD_BUSINESS_OVERALL_EVERY_MONTH = gql`
query {
    businessOverallEveryMonth{
        timePeriod
        revenue
        expense
        profit
    }
}`

export const LOAD_BUSINESS_OVERALL_EVERY_YEAR = gql`
query {
    businessOverallEveryYear{
        timePeriod
        revenue
        expense
        profit
    }
}`

export const LOAD_BUSINESS_OVERALL_PERIOD = gql`
query 
    businessOverallPeriod($period: PeriodDTO){
    businessOverallPeriod{
        timeFrom
        timeTo
        revenue
        expense
        profit
    }
}`