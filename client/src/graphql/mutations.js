// import { gql } from "graphql";

import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SignupUser($userSignin: UserSigninInput!) {
    signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const SEND_MSG = gql`
  mutation CreateMessage($recieverId: Int!, $text: String!) {
    createMessage(recieverId: $recieverId, text: $text) {
      createdAt
      id
      recieverId
      senderId
      text
    }
  }
`;
