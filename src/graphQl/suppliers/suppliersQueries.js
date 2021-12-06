import {gql} from '@apollo/client';
export const LOAD_SUPPLIERS = gql`
    query{
        suppliersByUser{
            name
            phoneNumber
            address
            email
        }
    }    
`