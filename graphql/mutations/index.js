import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation ($name:String!,$username:String!,$password:String!,$email:String!) {
        createUser(name:$name,username:$username,password:$password,email:$email) {
            message
            success
        }
    }`
export const CREATE_MESSAGE = gql`
    mutation ($senderId:ID!,$content:String!,$conversationId:ID!){
      createMessage(senderId:$senderId,content:$content,conversationId:$conversationId){
        success
        message
      }
    }`
export const CREATE_CONVERSATION = gql`
    mutation ($members:[String!]!){
      createConversation(members:$members){
        success
        message
      }
    }`


export const DELETE_MESSAGE = gql`
    mutation ($conversationId:ID!,$id:ID!,$senderId:ID!){
      deleteMessage(conversationId:$conversationId,senderId:$senderId,id:$id){
        success
        message
      }
    }`
export const DELETE_CONVERSATION = gql`
    mutation ($conversationId:ID!){
      deleteConversation(conversationId:$conversationId){
        success
        message
      }
    }`
export const DELETE_ACCOUNT = gql`
    mutation ($id:ID!,$secret:Int!){
      deleteAccount(id:$id,secret:$secret){
        message
        success
      }
    }`


export const RESET_PASSWORD = gql`
    mutation ($email:String!,$secret:Int!){
      resetPassword(email:$email,secret:$secret){
        success
        message
      }
    }`
export const RESET_SECRET_CODE = gql`
    mutation ($email:String!){
      resetSecretCode(email:$email){
        success
        message
      }
    }`


export const CHANGE_PASSWORD = gql`
    mutation ($id:ID!,$newPassword:String!,$oldPassword:String!){
      changePassword(id:$id,newPassword:$newPassword,oldPassword:$oldPassword){
        success
        message
      }
    }`
export const CHANGE_DETAILS = gql`
    mutation ($id:ID!,$username:String,$name:String,$description:String){
      changeDetails(id:$id,username:$username,name:$name,description:$description){
        success
        message
      }
    }`


export const LOGOUT = gql`
    mutation ($id:ID!){
      logout(id:$id){
        message
        success
      }
    }`
export const LOGIN_USER = gql`
    mutation ($email: String!, $password: String!, $secret: Int!){
      loginUser(email: $email, password: $password, secret: $secret) {
        success
        message
        token
        user {
              id
              name
              username
              image
              description
            }
      }
    }`

