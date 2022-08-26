import { gql } from "@apollo/client";

export const LOAD_TOTAL_EXPENSE_DAY = gql`
  query {
    totalExpenseDay {
      timePeriod
      expense
    }
  }
`;

export const LOAD_TOTAL_EXPENSE_WEEK = gql`
  query {
    totalExpenseWeek {
      timePeriod
      expense
    }
  }
`;

export const LOAD_TOTAL_EXPENSE_MONTH = gql`
  query {
    totalExpenseMonth {
      timePeriod
      expense
    }
  }
`;

export const LOAD_TOTAL_EXPENSE_YEAR = gql`
  query {
    totalExpenseYear {
      timePeriod
      expense
    }
  }
`;
