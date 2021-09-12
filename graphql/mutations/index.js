import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($payload:CreateUserInputType!) {
        createUser(payload:$payload) {
            message
            success
        }
    }
`;

export const RESET_SECRET_CODE = gql`
    mutation ResetSecretCode($id:ID!){
      resetSecretCode(id:$id){
        success
        message
      }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($id:ID!,$newPassword:String!,$oldPassword:String!){
      changePassword(id:$id,newPassword:$newPassword,oldPassword:$oldPassword){
        success
        message
      }
    }
`

export const CHANGE_BASIC_DETAILS = gql`
    mutation ChangeBasicDetails($id:ID!,$username:String,$name:String){
      changeBasicDetails(id:$id,username:$username,name:$name){
        success
        message
      }
    }
`

export const LOGOUT = gql`
    mutation Logout($id:ID!,$secret:Int!){
      logout(id:$id,secret:$secret){
        message
        success
      }
    }
`

export const DELETE_ACCOUNT = gql`
    mutation DeleteAccount($id:ID!,$secret:Int!){
      deleteAccount(id:$id,secret:$secret){
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
      _id
    }
    token
  }
}
`;

