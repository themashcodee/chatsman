import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation CreateUser($payload:CreateUserInputType!) {
        createUser(payload:$payload) {
            message
            success
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout($id:ID!,$secret:Int!){
      logout(id:$id,secret:$secret){
        message
        success
      }
    }
`

export const CREATE_CONVERSATION = gql`
mutation CreateConversation($name:String,$members:[String!]!,$isGroup:Boolean!,$image:String){
  createConversation(name:$name,members:$members,isGroup:$isGroup,image:$image){
    success
    message
    conversation {
      id
      members
      isGroup
    }
  }
}
`

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

