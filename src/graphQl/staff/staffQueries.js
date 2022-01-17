import { gql } from "@apollo/client";

export const LOAD_STAFFS = gql`
	query {
		staffsByUser {
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