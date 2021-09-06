import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation AddUser($payload:AddUserInputType) {
        addUser(payload:$payload) {
            email
            name
        }
    }
`