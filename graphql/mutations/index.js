import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation CreateUser($payload:CreateUserInputType) {
        createUser(payload:$payload) {
            message
            success
        }
    }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!, $secret: Int!){
  loginUser(email: $email, password: $password, secret: $secret) {
    success
    message
    user {
      name
      username
      image
      id
    }
    token
  }
}
`;

