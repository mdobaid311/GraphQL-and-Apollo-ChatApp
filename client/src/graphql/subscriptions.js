import { gql } from "@apollo/client";

export const MSG_SUB = gql`
  subscription Subscription {
    messageAdded {
      createdAt
      id
      recieverId
      senderId
      text
    }
  }
`;
