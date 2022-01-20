import { gql } from "@apollo/client";

export const ADD_STAFF_MUTATION = gql`
  mutation newStaff(
		$name: String!
		$phoneNumber: String
		$password: String!
		$address: String
		$userID: Int
		$staffPosition: StaffPosition
		$salary: Float
		$account: String
		$email: String
  ){
    newStaff(
      staffInput: {
        name: $name
        phoneNumber: $phoneNumber
        password: $password
        address: $address
				userID: $userID
				staffPosition: $staffPosition
				salary: $salary
				account: $account
				email: $email
      }
    )
    {staffID}
  } 
`;

export const DELETE_STAFF_MUTATION = gql`
  mutation deleteStaff($staffID: Int!) {
    deleteStaff(staffID: $staffID)
  }
`;