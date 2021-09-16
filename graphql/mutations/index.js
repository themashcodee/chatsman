import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($payload:CreateUserInputType!) {
        createUser(payload:$payload) {
            message
            success
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation ($senderId:ID!,$type:MessageType!,$content:String!,$conversationId:ID!){
      createMessage(senderId:$senderId,content:$content,type:$type,conversationId:$conversationId){
        success
        message
      }
    }
`

export const RESET_PASSWORD = gql`
    mutation ($email:String!,$secret:Int!){
      resetPassword(email:$email,secret:$secret){
        success
        message
      }
    }
`

export const RESET_SECRET_CODE = gql`
    mutation ($email:String!){
      resetSecretCode(email:$email){
        success
        message
      }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation ($id:ID!,$newPassword:String!,$oldPassword:String!){
      changePassword(id:$id,newPassword:$newPassword,oldPassword:$oldPassword){
        success
        message
      }
    }
`

export const CHANGE_BASIC_DETAILS = gql`
    mutation ($id:ID!,$username:String,$name:String,$description:String){
      changeBasicDetails(id:$id,username:$username,name:$name,description:$description){
        success
        message
      }
    }
`

export const LOGOUT = gql`
    mutation ($id:ID!){
      logout(id:$id){
        message
        success
      }
    }
`

export const DELETE_ACCOUNT = gql`
    mutation ($id:ID!,$secret:Int!){
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

