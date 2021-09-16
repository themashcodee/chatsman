import { gql } from '@apollo/client'

export const HEALTH_CHECKUP = gql`
    query ExampleQuery {
        health
    }
`

export const GET_USER = gql`
query GetUser($id:String,$username:String){
  getUser(id:$id,username:$username){
    success
    message
    user{
      _id
      name
      image
      name
    }
  }
}
`
export const GET_CONVERSATIONS = gql`
    query GetConversation{
  getConversations {
    message
    success
    conversations {
      id
      members
      name
      isGroup
      image
    }
  }
}
`

export const GET_MESSAGES = gql`
    query($conversationId:ID!,$isFull:Boolean) {
        getMessages(conversationId:$conversationId,isFull:$isFull) {
            message
            success
            messages {
                    senderId
                    id
                    type
                    content
                    createdAt
        }
    }
}
`