import { gql } from "@apollo/client";

export const LOAD_BUY_ORDERS = gql`
  query LOAD_BUY_ORDERS {
    buyOrdersByUser {
      buyOrderID
      supplier {
        email
        name
        address
        phoneNumber
      }
      creationTime
      status
      totalCost
      userID
    }
  }
`;

export const LOAD_BUY_ORDER = gql`
	query staffById($staffID:Int) {
		staff(staffID:$staffID) {
			staffID
			name
			phoneNumber
			password
			address
			userID
			staffPosition
			staffUUID
			salary
			account
			email
		}
	}
`;