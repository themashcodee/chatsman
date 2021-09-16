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