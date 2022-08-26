import { gql } from "@apollo/client";

export const UPDATE_PASS = gql`
    mutation updateUserPassword(
        $currentPassword: String!
        $newPassword: String!
        $confirmNewPassword: String!
    )
    {
        updateUserPassword(
            updateUserPassword:{
                currentPassword:$currentPassword
                newPassword:$newPassword
                confirmNewPassword:$confirmNewPassword
            }
        )
        
    }
`;
