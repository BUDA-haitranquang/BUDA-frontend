import { gql } from "@apollo/client";

export const LOAD_REVENUE_WEEKLY = gql`
  query {
    revenueWeekly {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_REVENUE_MONTHLY = gql`
  query {
    revenueMonthly {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_REVENUE_WEEKDAYS = gql`
  query {
    revenueWeekdays {
      timePeriod
      revenue
    }
  }
`;

export const LOAD_REVENUE_DAYS_THIS_MONTH = gql`
  query {
    revenueDaysThisMonth {
      timePeriod
      revenue
    }
  }
`;

