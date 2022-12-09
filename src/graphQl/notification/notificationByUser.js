import { gql } from "@apollo/client";

export const GET_NOTIFICATION_BY_USER = gql`
  query {
    notiByUser {
      notificationID
      seen
      message
    }
  }
`;
