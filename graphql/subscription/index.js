import { gql } from '@apollo/client'

export const LAST_MESSAGE_ADDED = gql`
  subscription ($conversationId:ID!) {
    lastMessageAdded(conversationId: $conversationId) {
      messages{
          content
          createdAt
          type
      }
    }
  }
`;

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
      name
      isGroup
      image
      }
    }
  }
`;