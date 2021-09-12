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