import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      email
      firstName
      id
      lastName
    }
  }
`;
export const GET_MSG = gql`
  query MessagesByUser($recieverId: Int!) {
    messagesByUser(recieverId: $recieverId) {
      createdAt
      id
      recieverId
      text
      senderId
    }
  }
`;
