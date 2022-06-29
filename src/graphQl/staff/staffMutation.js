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

export const UPDATE_STAFF_MUTATION = gql`
  mutation updateStaff(
    $staffID: Int!
		$name: String!
		$phoneNumber: String
		$password: String!
		$address: String
		$staffPosition: StaffPosition
		$salary: Float
		$email: String
  ){
    updateStaff(
      staffID: $staffID,
      staff: {
        name: $name
        phoneNumber: $phoneNumber
        password: $password
        address: $address
				staffPosition: $staffPosition
				salary: $salary
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


export const DELETE_STAFF_NOTE_MUTATION = gql`
  mutation deleteStaffNote($staffNoteID: Int!){
    deleteStaffNote(staffNoteID: $staffNoteID)
  }
`

export const ADD_STAFF_NOTE = gql ` 
  mutation newStaffNote(
      $staffID: Int!
      $message: String!
  )
  {
    newStaffNote(
      staffNoteInput:{
        message: $message
        staffID: $staffID
      }
    )
    {
      staffNoteID
    }
  }
`

export const UPDATE_STAFF_NOTE = gql `
  mutation updateStaffNote(
    $staffNoteID: Int!
    $message: String
    $seen: Boolean
    $staffID: Int
  )
  {
    updateStaffNote(
      staffNoteID: $staffNoteID
      staffNote:{
        message:$message
        seen: $seen
        staffID: $staffID
      }
    )
    {
      staffNoteID
    }
  }
`