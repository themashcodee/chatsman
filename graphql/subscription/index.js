import { gql } from '@apollo/client'

export const MESSAGE_ADDED = gql`
  subscription ($conversationId:ID!) {
    messageAdded(conversationId: $conversationId) {
      messages{
          id
          content
          createdAt
          senderId
          type
      }
    }
  }
`;

export const CONVERSATION_ADDED = gql`
  subscription ($id:ID!) {
    conversationAdded(id: $id) {
      conversations{
          id
          members
          wallpaper
          lastMessageTime
          lastMessage{
                  content
                  type
                  updatedAt
          }
      }
    }
  }
`;