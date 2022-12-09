import{gql} from '@apollo/client'

export const LOAD_CUSTOMERS = gql`
    query{
        customersByUser{
            customerID
            name
            phoneNumber
            ageGroup
            gender
            address
            totalSpend
    }}
`