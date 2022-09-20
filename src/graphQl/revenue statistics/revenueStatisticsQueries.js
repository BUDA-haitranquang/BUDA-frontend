import { gql } from "@apollo/client";

export const LOAD_TOTAL_REVENUE_DAY = gql`
  query {
    totalRevenueDay {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_TOTAL_REVENUE_WEEK = gql`
  query {
    totalRevenueWeek {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_TOTAL_REVENUE_MONTH = gql`
  query {
    totalRevenueMonth {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_TOTAL_REVENUE_YEAR = gql`
  query {
    totalRevenueYear {
      timePeriod
      revenue
    }
  }
`;
