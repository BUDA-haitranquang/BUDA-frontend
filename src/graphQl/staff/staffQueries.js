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

export const LOAD_STAFF = gql`
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


export const LOAD_STAFF_NOTES = gql`
	query{
		staffNotesByUser{
			staffNoteID
			userID
			staffID
			noteDate
			message
			seen
		}
	}	
`;