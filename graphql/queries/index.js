import { gql } from '@apollo/client'

export const GET_USER = gql`
    query GetUser($id:String,$username:String){
        getUser(id:$id,username:$username){
          success
          message
          user{
              id
              name
              image
              username
              description
              createdAt
            }
        }
    }`
export const GET_CONVERSATIONS = gql`
    query GetConversation($id:ID!){
        getConversations (id:$id){
          message
          success
          conversations {
              id
              members
              wallpaper
              lastMessage
              lastMessageType
              updatedAt
            }
        }
    }`
export const GET_MESSAGES = gql`
    query($conversationId:ID!,$isFull:Boolean) {
        getMessages(conversationId:$conversationId,isFull:$isFull) {
          message
          success
          messages {
              id
              senderId
              type
              content
              createdAt
            }
        }
    }`