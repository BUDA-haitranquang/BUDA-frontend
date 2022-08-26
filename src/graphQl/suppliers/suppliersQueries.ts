import {gql} from '@apollo/client';
export const LOAD_SUPPLIERS = gql`
    query{
        suppliersByUser{
            supplierID
            name
            phoneNumber
            address
            email
        }
    }    
`