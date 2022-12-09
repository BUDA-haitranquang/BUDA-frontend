import { gql } from "@apollo/client";

export const LOAD_TOTAL_SPEND_GENDER_BY_USER = gql`
  query {
    totalSpendGenderByUser {
      gender
      totalSpend
    }
  }
`;

export const LOAD_TOTAL_SPEND_GENDER_THIS_MONTH_BY_USER = gql`
  query {
    totalSpendGenderThisMonthByUser {
      gender
      totalSpend
    }
  }
`;

export const LOAD_TOTAL_SPEND_AGE_BY_USER = gql`
  query {
    totalSpendAgeGroupByUser {
      ageGroup
      totalSpend
    }
  }
`;

export const LOAD_TOTAL_SPEND_AGE_THIS_MONTH_BY_USER = gql`
  query {
    totalSpendAgeGroupThisMonthByUser {
      ageGroup
      totalSpend
    }
  }
`;

export const LOAD_RETENTION_RATE_WEEKLY = gql`
  query {
    retentionRateWeekly
  }
`;

export const LOAD_RETENTION_RATE_MOTHLY = gql`
  query {
    retentionRateMonthly
  }
`;

export const LOAD_TOTAL_COUNT_BY_HOUR = gql`
  query {
    totalCountByHours {
      hour
      totalCount
    }
  }
`;
